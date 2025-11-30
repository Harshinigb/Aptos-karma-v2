# backend/tests/test_oracle.py
from backend.oracle.scorer import compute_score
from backend.oracle.signer import OracleSigner

def test_heuristic_score():
    features = {
        "xp": 100,
        "work_count": 5,
        "reliability": 0.9,
        "recent_activity_days": 20
    }

    score, meta = compute_score("0xUSER", features)

    assert 0 <= score <= 100
    assert "xp_comp" in meta

def test_oracle_signature():
    signer = OracleSigner()
    payload = {"address": "0x123", "score": 70, "timestamp": 111111}

    sig = signer.sign_payload(payload)
    assert isinstance(sig, str)
    assert len(sig) > 20  # hex signature
