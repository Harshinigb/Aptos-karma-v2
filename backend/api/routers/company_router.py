# backend/api/routers/company_router.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.api.services.workgem_service import WorkGemService

router = APIRouter()
workgem_service = WorkGemService()

class ApproveWork(BaseModel):
    company: str
    employee: str
    work_id: str

@router.post("/approve")
async def approve_work(req: ApproveWork):
    try:
        tx = workgem_service.approve_work(req.company, req.employee, req.work_id)
        return {"status": "approved", "transaction": tx}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
