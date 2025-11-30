# backend/aptos/view_functions/get_passport_info.py
from backend.aptos.sdk_client import AptosClient
try:
    from aptos.constants import MODULE_ADDRESS_PASSPORT as MODULE_ADDR
except:
    MODULE_ADDR = "0xyour_passport_module_address"

RESOURCE_TYPE = f"{MODULE_ADDR}::passport::Passport"

client = AptosClient()

def get_passport_info(address: str):
    """
    Reads on-chain Passport:
      struct Passport { score, xp, tier, work_gems: vector<WorkGem> }
    """
    res = client.get_account_resource(address, RESOURCE_TYPE)

    if "data" not in res:
        return {
            "score": 0,
            "xp": 0,
            "tier": 0,
            "work_gems": []
        }

    data = res["data"]

    return {
        "score": int(data.get("score", 0)),
        "xp": int(data.get("xp", 0)),
        "tier": int(data.get("tier", 0)),
        "work_gems": data.get("work_gems", [])
    }
