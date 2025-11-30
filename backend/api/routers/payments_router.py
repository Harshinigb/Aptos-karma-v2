# backend/api/routers/payments_router.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.api.services.payment_service import PaymentService

router = APIRouter()
payment_service = PaymentService()

class PaymentReq(BaseModel):
    sender: str
    receiver: str
    amount: int

@router.post("/send")
async def send_payment(req: PaymentReq):
    try:
        tx = payment_service.send_payment(req.sender, req.receiver, req.amount)
        return {"status": "sent", "tx": tx}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
