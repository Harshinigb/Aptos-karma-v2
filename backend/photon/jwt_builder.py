# backend/photon/jwt_builder.py
import jwt
import time
import os

PHOTON_JWT_SECRET = os.getenv("PHOTON_JWT_SECRET", "test_secret")

def build_jwt(user_id: str, email: str = None, name: str = None, expires_in: int = 3600):
    payload = {
        "user_id": user_id,
        "email": email,
        "name": name,
        "iat": int(time.time()),
        "exp": int(time.time()) + expires_in
    }

    return jwt.encode(payload, PHOTON_JWT_SECRET, algorithm="HS256")
