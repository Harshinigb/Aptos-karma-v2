# backend/api/schemas/auth_schema.py
from pydantic import BaseModel

class WalletAuthRequest(BaseModel):
    address: str
    signature: str
    message: str

class AuthResponse(BaseModel):
    access_token: str
    address: str
