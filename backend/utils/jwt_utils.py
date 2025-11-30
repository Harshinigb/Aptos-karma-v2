# backend/utils/jwt_utils.py
import time
import jwt
from dotenv import load_dotenv
import os

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET", "dev_secret_key")
JWT_ALG = "HS256"

def create_jwt(claims: dict, expires_in: int = 86400):
    """Create a JWT with provided claims."""
    payload = {
        **claims,
        "exp": time.time() + expires_in,
        "iat": time.time()
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALG)

def decode_jwt(token: str):
    """Decode a JWT token."""
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
    except Exception:
        return None
