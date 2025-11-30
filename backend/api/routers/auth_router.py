# backend/api/routers/auth_router.py
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from backend.api.services.auth_service import AuthService

router = APIRouter()
auth_service = AuthService()

class WalletAuth(BaseModel):
    address: str
    signature: str
    message: str

@router.post("/wallet-login")
async def wallet_login(req: WalletAuth):
    try:
        token = auth_service.verify_and_issue_token(req.address, req.message, req.signature)
        return {"access_token": token, "address": req.address}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
