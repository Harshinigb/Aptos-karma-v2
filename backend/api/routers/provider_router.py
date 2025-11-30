# backend/api/routers/provider_router.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.api.services.provider_service import ProviderService

router = APIRouter()
provider_service = ProviderService()

class DepositReq(BaseModel):
    provider: str
    amount: int

@router.post("/deposit")
async def deposit(req: DepositReq):
    try:
        tx = provider_service.deposit(req.provider, req.amount)
        return {"status": "deposited", "tx": tx}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
