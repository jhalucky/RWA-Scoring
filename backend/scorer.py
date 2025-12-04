"""
Simple, explainable heuristic scorer for RWA documents.
Replace `extract_text_from_file` (OCR) with pytesseract or a transformer.
Replace `score_asset` internals with your ML model inference.
"""

from typing import Dict, Any, Tuple, List
import re
from collections import defaultdict
from PIL import Image
import pytesseract

def extract_text_from_file(path: str) -> str:
    """
    Minimal OCR. If pytesseract not available, returns empty string.
    For now, try to open as image; if fails, try read as text.
    """
    try:
        img = Image.open(path)
        text = pytesseract.image_to_string(img)
        return text
    except Exception:
        # try reading raw bytes as text (for PDFs you'd need pdfminer or similar)
        try:
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                return f.read()
        except Exception:
            return ""

def _score_by_presence(text: str, keywords: Dict[str,int]) -> Tuple[int, Dict[str,int]]:
    score = 0
    found = {}
    t = text.lower()
    for k, w in keywords.items():
        if k in t:
            score += w
            found[k] = 1
        else:
            found[k] = 0
    return score, found

def score_asset(text: str, metadata: Dict[str,Any]={}) -> Tuple[float, List[Dict[str,Any]]]:
    """
    Returns (score_float, breakdown_list)
    Score range: 0 - 100
    Heuristics:
      - presence of identity fields (owner name, title deed words)
      - presence of valuation / amounts
      - presence of dates
      - presence of signatures
      - clean numeric amounts vs many handwritten words
      - optional metadata boosts (e.g., verified_offchain: True)
    Replace this with a proper ML model (document classifier + numeric entity extraction).
    """
    if not text:
        return 0.0, [{"reason":"no_text","score":0}]

    base = 10
    breakdown = []
    kws = {
        "deed": 10,
        "title": 8,
        "invoice": 8,
        "amount": 6,
        "signature": 6,
        "owner": 6,
        "property": 8,
        "asset": 5,
        "id": 3,
        "date": 4,
        "valuation": 8,
        "price": 5,
        "tax": 4,
        "agreement": 6
    }
    pres_score, pres_found = _score_by_presence(text, kws)
    base += pres_score
    breakdown.append({"reason":"keyword_presence", "detail": pres_found, "score": pres_score})

    # numeric richness: how many numbers / currency symbols
    nums = re.findall(r"[\d,]+(?:\.\d+)?", text)
    num_count = len(nums)
    num_score = min(num_count * 2, 20)
    base += num_score
    breakdown.append({"reason":"numeric_entities", "count": num_count, "score": num_score})

    # date presence
    date_like = bool(re.search(r"\b(19|20)\d{2}\b", text))
    date_score = 5 if date_like else 0
    base += date_score
    breakdown.append({"reason":"date_presence", "found": date_like, "score": date_score})

    # metadata boosts
    meta_score = 0
    if metadata.get("verified_offchain"):
        meta_score += 20
        breakdown.append({"reason":"metadata_verified_offchain","score":20})
    if metadata.get("audited"):
        meta_score += 10
        breakdown.append({"reason":"metadata_audited","score":10})
    base += meta_score

    # normalize to 0-100
    final = max(0, min(100, base))
    return float(final), breakdown

def pretty_breakdown(breakdown):
    # simple string summary
    lines = []
    for part in breakdown:
        lines.append(f"{part.get('reason')}: +{part.get('score')}")
    return "\n".join(lines)
