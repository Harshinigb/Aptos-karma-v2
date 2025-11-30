# backend/api/routers/photon_router.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.api.services.photon_service import PhotonService

router = APIRouter()
photon_service = PhotonService()

# ---------------------------------------------------------
# 1. ONBOARD USER
# ---------------------------------------------------------
class OnboardReq(BaseModel):
    user_id: str
    email: str | None = None
    name: str | None = None

@router.post("/onboard")
async def onboard(req: OnboardReq):
    """
    Registers a user with Photon using a custom JWT.
    """
    try:
        result = photon_service.onboard_user(
            req.user_id,
            req.email,
            req.name
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ---------------------------------------------------------
# 2. REWARDED EVENT
# ---------------------------------------------------------
class RewardReq(BaseModel):
    campaign_id: str
    user_id: str
    metadata: dict = {}

@router.post("/reward")
async def reward_user(req: RewardReq):
    """
    Trigger a rewarded event in Photon.
    Photon will mint + deposit PAT tokens based on campaign rules.
    """
    try:
        result = photon_service.reward_event(
            req.campaign_id,
            req.user_id,
            req.metadata
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ---------------------------------------------------------
# 3. UNREWARDED EVENT
# ---------------------------------------------------------
class UnRewardReq(BaseModel):
    campaign_id: str
    user_id: str
    metadata: dict = {}

@router.post("/unreward")
async def unreward_user(req: UnRewardReq):
    """
    Trigger an unrewarded event in Photon.
    (Event is logged but no PAT tokens are issued.)
    """
    try:
        result = photon_service.unreward_event(
            req.campaign_id,
            req.user_id,
            req.metadata
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
