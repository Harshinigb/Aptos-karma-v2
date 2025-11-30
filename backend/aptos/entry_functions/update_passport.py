# backend/aptos/entry_functions/update_passport.py
from typing import Dict, Any
from backend.aptos.sdk_client import AptosClient
from backend.utils.constants import MODULE_ADDRESS_WORK_GEM as MODULE_ADDR


MODULE = "passport"
FUNCTION = "update_score"   # name must match your Move entry fn

def build_update_passport_payload(user_address: str, score: int, timestamp: int, signature_hex: str) -> Dict[str, Any]:
    """
    Build payload for passport::update_score(address, score, timestamp, signature)
    - user_address: user wallet address (0x...)
    - score: integer score from oracle
    - timestamp: unix timestamp from oracle
    - signature_hex: oracle ED25519 signature hex string covering payload
    """
    args = [user_address, score, timestamp, signature_hex]
    client = AptosClient()
    return client.build_entry_payload(MODULE_ADDR, MODULE, FUNCTION, [], args)
