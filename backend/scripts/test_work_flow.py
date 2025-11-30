# backend/scripts/test_work_flow.py
import time
from api.services.workgem_service import WorkGemService
from api.services.oracle_service import OracleService

def main():
    employee = "0xEmployee..."
    company = "0xCompany..."
    work_content = "Completed backend integration"
    timestamp = int(time.time())

    print("\n--- Work Submit Test ---")
    svc = WorkGemService()
    req_payload = svc.submit_work(employee, f"hash:{timestamp}", xp=10)
    print("Submit Work Payload:", req_payload)

    print("\n--- Company Approval Test ---")
    approve_payload = svc.approve_work(company, employee, work_id="1")
    print("Approve Payload:", approve_payload)

    print("\n--- Oracle Score Test ---")
    oracle = OracleService()
    score_packet = oracle.get_signed_score(
        employee,
        features={"xp": 10, "quality": 0.95}
    )
    print("Oracle Scoring Packet:", score_packet)

    print("\nDone.\n")

if __name__ == "__main__":
    main()
