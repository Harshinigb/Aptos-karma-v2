# backend/aptos/entry_functions/withdraw_pool.py
from typing import Dict, Any
from backend.aptos.sdk_client import AptosClient
from backend.utils.constants import MODULE_ADDRESS_WORK_GEM as MODULE_ADDR


MODULE = "micro_loan_pool"
FUNCTION = "withdraw"

def build_withdraw_payload(provider: str, amount: int) -> Dict[str, Any]:
    """
    Build payload for micro_loan_pool::withdraw(provider, amount)
    - provider: 0x... address
    - amount: integer amount to withdraw
    """
    args = [provider, amount]
    client = AptosClient()
    return client.build_entry_payload(MODULE_ADDR, MODULE, FUNCTION, [], args)
