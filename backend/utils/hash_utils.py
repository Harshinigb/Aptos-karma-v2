# backend/utils/hash_utils.py
import hashlib

def sha3_hash(data: str) -> str:
    """Return SHA3-256 hash hex string."""
    return hashlib.sha3_256(data.encode()).hexdigest()

def work_hash(employee: str, content: str, timestamp: int) -> str:
    """
    Standard WorkGem proof hash:
      hash = sha3(employee || timestamp || content)
    """
    raw = f"{employee}{timestamp}{content}"
    return sha3_hash(raw)
