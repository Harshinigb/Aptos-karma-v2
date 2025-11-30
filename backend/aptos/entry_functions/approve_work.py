# backend/aptos/entry_functions/approve_work.py
from typing import Dict, Any
from backend.aptos.sdk_client import AptosClient
from backend.utils.constants import MODULE_ADDRESS_WORK_GEM as MODULE_ADDR


MODULE = "work_gem"
FUNCTION = "approve_work"

def build_approve_work_payload(company: str, employee: str, work_id: str) -> Dict[str, Any]:
    """
    Build entry function payload for work_gem::approve_work(company, employee, work_id)
    - company: approver company address
    - employee: employee address (owner of work)
    - work_id: identifier for the submitted work (string or u64 depending on your Move signature)
    """
    args = [company, employee, work_id]
    client = AptosClient()
    return client.build_entry_payload(MODULE_ADDR, MODULE, FUNCTION, [], args)
