# backend/api/routers/user_router.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.api.services.passport_service import PassportService

router = APIRouter()
passport_service = PassportService()

class AddressReq(BaseModel):
    address: str

@router.post("/passport")
async def get_passport(req: AddressReq):
    try:
        data = passport_service.get_passport(req.address)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
