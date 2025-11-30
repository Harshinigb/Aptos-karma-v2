# backend/oracle/signer.py
"""
ED25519 signer for oracle payloads.
Produces hex signature (lowercase hex) that Move contracts can verify.
"""

import os
import json
import nacl.signing
import nacl.encoding
from typing import Dict, Any

class OracleSigner:
    def __init__(self):
        # ORACLE_PRIVATE_KEY_HEX environment variable must be the 64-byte hex of the signing key
        key_hex = os.getenv("ORACLE_PRIVATE_KEY_HEX")
        if not key_hex:
            # generate ephemeral key for development - WARNING: do not use in production
            sk = nacl.signing.SigningKey.generate()
            self._sk = sk
            print("WARNING: ORACLE_PRIVATE_KEY_HEX not set - generated ephemeral key (dev only).")
        else:
            try:
                key_bytes = bytes.fromhex(key_hex)
                self._sk = nacl.signing.SigningKey(key_bytes)
            except Exception as e:
                raise RuntimeError(f"Invalid ORACLE_PRIVATE_KEY_HEX: {e}")

        self.verify_key = self._sk.verify_key

    def sign_payload(self, payload: Dict[str, Any]) -> str:
        """
        Canonical bytes to sign: canonical JSON with sorted keys (UTF-8)
        Returns signature hex string.
        """
        # Create canonical JSON
        payload_json = json.dumps(payload, separators=(",", ":"), sort_keys=True).encode("utf-8")
        signed = self._sk.sign(payload_json)
        signature = signed.signature.hex()
        return signature

    def get_public_key_hex(self) -> str:
        return self.verify_key.encode(encoder=nacl.encoding.HexEncoder).decode()
