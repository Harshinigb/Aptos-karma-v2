# backend/aptos/entry_functions/repay.py
from typing import Dict, Any

from backend.utils.constants import MODULE_ADDRESS_WORK_GEM as MODULE_ADDR


MODULE = "micro_loan_pool"
FUNCTION = "repay"


def build_repay_payload(address: str, amount: int) -> Dict[str, Any]:
    """
    Build payload for micro_loan_pool::repay(address, amount)
    """
    return {
        "type": "entry_function_payload",
        "function": f"{MODULE_ADDR}::{MODULE}::{FUNCTION}",
        "type_arguments": [],
        "arguments": [address, amount]
    }
