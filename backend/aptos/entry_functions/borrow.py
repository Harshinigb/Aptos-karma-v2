# backend/aptos/entry_functions/borrow.py
from typing import Dict, Any, Optional
from backend.aptos.sdk_client import AptosClient
from backend.utils.constants import MODULE_ADDRESS_WORK_GEM as MODULE_ADDR


MODULE = "micro_loan_pool"
FUNCTION = "borrow"

def build_borrow_payload(borrower: str, amount: int, tenor_months: Optional[int] = None) -> Dict[str, Any]:
    """
    Build payload for micro_loan_pool::borrow(borrower, amount, tenor_opt)
    - borrower: 0x... address
    - amount: integer (native units, e.g. cents or smallest unit)
    - tenor_months: optional loan tenure months
    """
    args = [borrower, amount]
    if tenor_months is not None:
        args.append(tenor_months)
    client = AptosClient()
    return client.build_entry_payload(MODULE_ADDR, MODULE, FUNCTION, [], args)
