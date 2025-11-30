# backend/oracle/main.py
import os
import time
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional

from backend.oracle.scorer import compute_score
from backend.oracle.signer import OracleSigner
from backend.oracle.feature_extractor import extract_default_features

app = FastAPI(title="Karma Oracle", version="1.0.0")

# Oracle signer -- reads ORACLE_PRIVATE_KEY_HEX from env (must be kept secret)
SIGNER = OracleSigner()

class ScoreRequest(BaseModel):
    address: str
    features: Optional[Dict[str, Any]] = None
    use_llm: Optional[bool] = False   # if True and LLM key present, uses LLM-enhanced scoring

class ScoreResponse(BaseModel):
    payload: Dict[str, Any]
    signature: str

@app.post("/score", response_model=ScoreResponse)
async def score(req: ScoreRequest):
    address = req.address
    features = req.features

    # 1. If no features provided, build default features from on-chain data
    if not features:
        try:
            features = await extract_default_features(address)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"feature extraction failed: {e}")

    # 2. Compute score (heurstic or LLM)
    try:
        score_value, meta = compute_score(address, features, use_llm=req.use_llm)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"scoring failed: {e}")

    timestamp = int(time.time())
    payload = {
        "address": address,
        "score": int(score_value),
        "features": features,
        "meta": meta,
        "timestamp": timestamp
    }

    # 3. Sign payload with ED25519
    signature_hex = SIGNER.sign_payload(payload)

    return {"payload": payload, "signature": signature_hex}
