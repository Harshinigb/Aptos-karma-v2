# backend/utils/signature_utils.py
import base64
import binascii
import nacl.signing
import nacl.exceptions

APTOS_MESSAGE_PREFIX = b"\x17Aptos Signed Message:"

def verify_wallet_signature(address: str, message: str, signature_b64: str) -> bool:
    """
    Verifies wallet signature according to Aptos signing standard:
      signed = Sign( prefix || message )
    - address: hex string, 0x-prefixed
    - message: the exact message user signed
    - signature_b64: base64 wallet signature
    """

    try:
        signature = base64.b64decode(signature_b64)
    except Exception:
        return False

    try:
        pubkey_hex = address.replace("0x", "")
        pubkey_bytes = binascii.unhexlify(pubkey_hex)

        verify_key = nacl.signing.VerifyKey(pubkey_bytes)
        verify_key.verify(APTOS_MESSAGE_PREFIX + message.encode(), signature)
        return True

    except (nacl.exceptions.BadSignatureError, ValueError, Exception):
        return False
