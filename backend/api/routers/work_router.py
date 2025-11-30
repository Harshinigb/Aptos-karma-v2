from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.api.services.workgem_service import WorkGemService

# IMPORTANT: NO PREFIX HERE
router = APIRouter()

workgem_service = WorkGemService()


class SubmitWork(BaseModel):
    employee: str
    work_hash: str
    xp: int


@router.post("/submit")
async def submit_work(req: SubmitWork):
    try:
        tx = workgem_service.submit_work(
            employee=req.employee,
            work_hash=req.work_hash,
            xp=req.xp
        )
        return {
            "status": "submitted",
            "employee": req.employee,
            "work_hash": req.work_hash,
            "xp": req.xp,
            "transaction": tx
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))