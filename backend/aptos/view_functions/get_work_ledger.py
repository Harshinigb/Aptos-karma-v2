# backend/aptos/view_functions/get_work_ledger.py
from aptos.sdk_client import AptosClient
try:
    from aptos.constants import MODULE_ADDRESS_WORK_GEM as MODULE_ADDR
except:
    MODULE_ADDR = "0xyour_workgem_module_address"

RESOURCE_TYPE = f"{MODULE_ADDR}::work_gem::WorkLedger"

client = AptosClient()

def get_work_ledger(address: str):
    """
    Returns all submitted + approved WorkGems for an employee.
    """
    res = client.get_account_resource(address, RESOURCE_TYPE)

    if "data" not in res:
        return {"work": []}

    return {
        "work": res["data"].get("entries", [])
    }
