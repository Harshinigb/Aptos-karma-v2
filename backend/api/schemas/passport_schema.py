# backend/api/schemas/passport_schema.py
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class WorkGem(BaseModel):
    work_id: str
    hash: str
    xp: int
    timestamp: int
    approved: bool = False

class Passport(BaseModel):
    address: str
    score: int
    xp: int
    tier: int
    work_gems: List[Dict[str, Any]] = []
