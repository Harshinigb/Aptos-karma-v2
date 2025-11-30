# backend/api/schemas/loan_schema.py
from pydantic import BaseModel

class BorrowRequest(BaseModel):
    address: str
    amount: int

class RepayRequest(BaseModel):
    address: str
    amount: int

class LoanResponse(BaseModel):
    status: str
    tx: dict
