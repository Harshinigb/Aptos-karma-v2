# backend/aptos/view_functions/get_user_loans.py
from aptos.sdk_client import AptosClient
try:
    from aptos.constants import MODULE_ADDRESS_LOAN_POOL as MODULE_ADDR
except:
    MODULE_ADDR = "0xyour_microloan_module_address"

RESOURCE_TYPE = f"{MODULE_ADDR}::micro_loan_pool::LoanBook"

client = AptosClient()

def get_user_loans(address: str):
    """
    Returns all loan positions associated with a user.
    """
    res = client.get_account_resource(address, RESOURCE_TYPE)

    if "data" not in res:
        return {"loans": []}

    return {
        "loans": res["data"].get("loans", [])
    }
