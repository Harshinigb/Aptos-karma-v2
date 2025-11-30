# backend/api/schemas/work_schema.py
from pydantic import BaseModel

class SubmitWorkRequest(BaseModel):
    employee: str
    work_hash: str
    xp: int

class ApproveWorkRequest(BaseModel):
    company: str
    employee: str
    work_id: str
