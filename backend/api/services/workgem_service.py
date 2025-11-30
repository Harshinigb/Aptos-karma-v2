# backend/api/services/workgem_service.py

from backend.aptos.entry_functions.submit_work import build_submit_work_payload
from backend.aptos.entry_functions.approve_work import build_approve_work_payload
from backend.aptos.sdk_client import AptosClient


class WorkGemService:
    def __init__(self):
        self.client = AptosClient()


    # -------------------------------------------------------------
    # SUBMIT WORK (Employee submits hashed work + XP)
    # -------------------------------------------------------------
    def submit_work(self, employee: str, work_hash: str, xp: int):
        """
        Build the Aptos transaction payload for submitting work.
        Returned payload will be signed client-side by the employee wallet.
        """
        payload = build_submit_work_payload(
            employee=employee,
            work_hash=work_hash,
            xp=xp
        )

        return {
            "action": "submit_work",
            "employee": employee,
            "work_hash": work_hash,
            "xp": xp,
            "payload": payload
        }


    # -------------------------------------------------------------
    # APPROVE WORK (Company verifies WorkGem)
    # -------------------------------------------------------------
    def approve_work(self, company: str, employee: str, work_id: str):
        """
        Build the Aptos transaction payload for approving a WorkGem.
        Returned payload is signed by the COMPANY wallet.
        """
        payload = build_approve_work_payload(
            company=company,
            employee=employee,
            work_id=work_id
        )

        return {
            "action": "approve_work",
            "company": company,
            "employee": employee,
            "work_id": work_id,
            "payload": payload
        }
