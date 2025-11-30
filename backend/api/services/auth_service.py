# backend/api/services/auth_service.py

import os
import time
import hmac
import hashlib

from backend.utils.signature_utils import verify_wallet_signature
from backend.utils.jwt_utils import create_jwt


# -------------------------------------
# DEV MODE: Skip Signature Verification
# -------------------------------------
DEV_MODE = True        # Set to False for production
# Or make it an environment variable:
# DEV_MODE = os.getenv("DEV_MODE", "false").lower() == "true"


class AuthService:

    def verify_and_issue_token(self, address: str, message: str, signature: str):
        """
        Verify wallet signature (or skip verification in DEV mode)
        Then issue a JWT token for authentication.
        """

        # Skip signature validation in development/testing
        if DEV_MODE:
            print("[DEV MODE] Skipping wallet signature verification.")
        else:
            # Real signature verification (production)
            if not verify_wallet_signature(address, message, signature):
                raise Exception("Invalid signature")

        # If verification passes → create JWT
        token = create_jwt({"address": address})

        return {
            "auth": True,
            "address": address,
            "role": "user",   # simple default role (optional)
            "token": token
        }
