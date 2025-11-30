from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.api.services.loan_service import LoanService

router = APIRouter()
loan_service = LoanService()

class BorrowReq(BaseModel):
    address: str
    amount: int

class RepayReq(BaseModel):
    address: str
    amount: int

@router.post("/borrow")
async def borrow(req: BorrowReq):
    try:
        return loan_service.request_borrow(req.address, req.amount)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/repay")
async def repay(req: RepayReq):
    try:
        return loan_service.request_repay(req.address, req.amount)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
