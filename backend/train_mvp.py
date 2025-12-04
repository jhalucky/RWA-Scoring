import os
import random
import joblib
import numpy as np
from tqdm import trange
from sentence_transformers import SentenceTransformer
import lightgbm as lgb

os.makedirs("models", exist_ok=True)

# use a light, fast embedding model
EMBED_MODEL_NAME = "all-MiniLM-L6-v2"

good_templates = [
    "Title deed for property located at {addr}. Owner: {name}. Amount {amt}. Signed on {year}. Signature present.",
    "Official property agreement between {name} and {name2}. Purchase price {amt}. Registered on {year}. Signature and stamp.",
    "Invoice #{inv} for asset purchase. Buyer {name}. Total amount {amt}. Due date {year}-05-12. Signed by authorized representative.",
]

bad_templates = [
    "Random note about something with no clear owner or amount.",
    "Draft document, not signed, not final. Missing data.",
    "Lorem ipsum text. This is not an asset document and has no numbers.",
    "Meeting notes for {year}, discussion about possible future purchase.",
]

names = ["Alice", "Bob", "Charlie", "Lucky", "Rohit", "Sanya"]
addresses = ["Delhi", "Mumbai", "Bangalore", "Pune", "Hyderabad"]
amounts = ["1,000,000", "50,000", "2,500,000", "750,000"]
years = ["2019", "2020", "2021", "2022", "2023"]
invs = ["INV-001", "INV-002", "INV-100", "INV-777"]

def synth_good():
    return random.choice(good_templates).format(
        addr=random.choice(addresses),
        name=random.choice(names),
        name2=random.choice(names),
        amt=random.choice(amounts),
        year=random.choice(years),
        inv=random.choice(invs),
    )

def synth_bad():
    return random.choice(bad_templates).format(year=random.choice(years))

def build_dataset(n_good=400, n_bad=400):
    texts = []
    labels = []
    for _ in range(n_good):
        texts.append(synth_good())
        labels.append(1)
    for _ in range(n_bad):
        texts.append(synth_bad())
        labels.append(0)
    combined = list(zip(texts, labels))
    random.shuffle(combined)
    texts, labels = zip(*combined)
    return list(texts), list(labels)

def main():
    print("Building synthetic dataset...")
    texts, labels = build_dataset()

    print(f"Samples: {len(texts)}")
    print("Loading embedding model:", EMBED_MODEL_NAME)
    embed_model = SentenceTransformer(EMBED_MODEL_NAME)

    print("Encoding texts (this may take a bit)...")
    embs = embed_model.encode(texts, show_progress_bar=True, convert_to_numpy=True)

    # train/val split
    n = len(embs)
    split = int(n * 0.8)
    X_train, X_val = embs[:split], embs[split:]
    y_train, y_val = np.array(labels[:split]), np.array(labels[split:])

    lgb_train = lgb.Dataset(X_train, label=y_train)
    lgb_val = lgb.Dataset(X_val, label=y_val, reference=lgb_train)

    params = {
        "objective": "binary",
        "metric": "auc",
        "learning_rate": 0.05,
        "num_leaves": 31,
        "verbose": -1,
    }

    print("Training LightGBM...")
    bst = lgb.train(
        params,
        lgb_train,
        num_boost_round=300,
        valid_sets=[lgb_train, lgb_val],
        # early_stopping_rounds=30,  # pyright: ignore[reportCallIssue]
        # verbose_eval=50,  # pyright: ignore[reportCallIssue]
    )

    # save only the LGBM model; embed model stays pre-trained
    joblib.dump(bst, "models/rwa_lgbm.pkl")
    print("Saved model to models/rwa_lgbm.pkl")

if __name__ == "__main__":
    main()
