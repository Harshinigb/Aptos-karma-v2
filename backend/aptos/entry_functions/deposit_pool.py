# backend/aptos/entry_functions/deposit_pool.py
from typing import Dict, Any
from backend.aptos.sdk_client import AptosClient
from backend.utils.constants import MODULE_ADDRESS_WORK_GEM as MODULE_ADDR

MODULE = "micro_loan_pool"
FUNCTION = "deposit"

def build_deposit_payload(provider: str, amount: int) -> Dict[str, Any]:
    """
    Build payload for micro_loan_pool::deposit(provider, amount)
    - provider: 0x... address of liquidity provider
    - amount: integer amount to deposit
    """
    args = [provider, amount]
    client = AptosClient()
    return client.build_entry_payload(MODULE_ADDR, MODULE, FUNCTION, [], args)
