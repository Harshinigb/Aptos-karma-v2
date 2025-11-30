# backend/api/schemas/photon_schema.py
from pydantic import BaseModel
from typing import Optional, Dict, Any

class PhotonOnboardRequest(BaseModel):
    user_id: str
    email: Optional[str] = None
    name: Optional[str] = None

class PhotonRewardRequest(BaseModel):
    campaign_id: str
    user_id: str
    metadata: Dict[str, Any]

class PhotonResponse(BaseModel):
    status: str
    data: Dict[str, Any]
