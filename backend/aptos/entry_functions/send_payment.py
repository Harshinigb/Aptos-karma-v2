# backend/aptos/entry_functions/send_payment.py
from typing import Dict, Any, Optional
from backend.aptos.sdk_client import AptosClient
from backend.utils.constants import MODULE_ADDRESS_WORK_GEM as MODULE_ADDR

MODULE = "payments"
FUNCTION = "pay"

def build_payment_payload(sender: str, receiver: str, amount: int, memo: Optional[str] = "") -> Dict[str, Any]:
    """
    Build payload for payments::pay(sender, receiver, amount, memo)
    - sender: 0x... address (payer)
    - receiver: 0x... address (payee)
    - amount: integer smallest-unit amount
    - memo: optional memo string
    """
    args = [sender, receiver, amount, memo]
    client = AptosClient()
    return client.build_entry_payload(MODULE_ADDR, MODULE, FUNCTION, [], args)
