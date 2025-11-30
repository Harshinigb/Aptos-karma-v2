# backend/api/schemas/payment_schema.py
from pydantic import BaseModel
from typing import Optional

class PaymentRequest(BaseModel):
    sender: str
    receiver: str
    amount: int
    memo: Optional[str] = None

class QRCodeResponse(BaseModel):
    qr_data: str
    from_addr: str
    to_addr: str
    amount: int
