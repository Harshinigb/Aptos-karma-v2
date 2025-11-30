# backend/api/schemas/user_schema.py
from pydantic import BaseModel
from typing import Optional

class UserRole(BaseModel):
    is_employee: bool
    is_company: bool
    is_provider: bool
    role: Optional[str] = None

class UserProfile(BaseModel):
    address: str
    role: str
    score: int
    xp: int
    tier: int
