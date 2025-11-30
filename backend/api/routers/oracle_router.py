# backend/api/routers/oracle_router.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.api.services.oracle_service import OracleService

router = APIRouter()
oracle_service = OracleService()

class ScoreReq(BaseModel):
    address: str   # ✅ Only this field

@router.post("/score")
async def score(req: ScoreReq):
    try:
        return oracle_service.get_score(req.address)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
