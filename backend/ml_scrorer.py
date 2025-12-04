# scorer_ml.py
import re
import numpy as np
import joblib
from sentence_transformers import SentenceTransformer

EMBED_MODEL_NAME = "all-MiniLM-L6-v2"
LGB_MODEL_PATH = "models/rwa_lgbm.pkl"

print("Loading embedding model and LightGBM model...")
embed_model = SentenceTransformer(EMBED_MODEL_NAME)
lgb_model = joblib.load(LGB_MODEL_PATH)
print("Models loaded.")

def simple_features(text: str):
    nums = re.findall(r"[\d,]+(?:\.\d+)?", text)
    num_count = len(nums)
    has_date = bool(re.search(r"\b(19|20)\d{2}\b", text))
    has_sig = "signature" in text.lower() or "signed" in text.lower()
    return np.array([[num_count, int(has_date), int(has_sig)]], dtype=float)

def score_asset_ml(text: str, metadata=None):
    metadata = metadata or {}
    txt = (text or "").strip()
    if not txt:
        return 0.0, [{"reason": "no_text", "score": 0}]

    # embedding
    emb = embed_model.encode([txt], convert_to_numpy=True)

    # extra small numeric features
    extra = simple_features(txt)

    X = emb

    proba = lgb_model.predict(X)  # probability of class 1
    score = float(proba[0] * 100.0)  # scale 0–100

    breakdown = [
        {"reason": "model_probability", "score": score},
        {"reason": "num_entities", "value": int(extra[0,0]), "score": min(extra[0,0]*2, 20)},
        {"reason": "has_date", "value": bool(extra[0,1]), "score": 5 if extra[0,1] else 0},
        {"reason": "has_signature", "value": bool(extra[0,2]), "score": 5 if extra[0,2] else 0},
    ]
    return score, breakdown
