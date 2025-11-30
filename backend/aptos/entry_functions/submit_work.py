# backend/aptos/entry_functions/submit_work.py
from typing import Dict, Any
from backend.aptos.sdk_client import AptosClient
from backend.utils.constants import MODULE_ADDRESS_WORK_GEM as MODULE_ADDR


MODULE = "work_gem"
FUNCTION = "submit_work"

def build_submit_work_payload(employee: str, work_hash: str, xp: int) -> Dict[str, Any]:
    """
    Build entry function payload for work_gem::submit_work(employee: address, work_hash: vector<u8>, xp: u64)
    - employee: hex address string (0x...)
    - work_hash: opaque string or hex representation of the work proof
    - xp: integer XP awarded
    Returns a dict with 'payload' (entry_function_payload) ready to sign/submit.
    """
    # Convert arguments to types expected by Move (strings, ints). Adjust if you expect bytes.
    args = [employee, work_hash, xp]
    client = AptosClient()
    return client.build_entry_payload(MODULE_ADDR, MODULE, FUNCTION, [], args)
