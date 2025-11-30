# backend/api/services/photon_service.py

import jwt
import time
import os
from backend.photon.client import PhotonClient


class PhotonService:
    def __init__(self):
        self.client = PhotonClient()
        self.jwt_secret = os.getenv("PHOTON_JWT_SECRET", "demo-secret")

    # ------------------------------------------------------
    # 1. ONBOARD USER (Generate JWT → Register on Photon)
    # ------------------------------------------------------
    def onboard_user(self, user_id: str, email: str, name: str):
        """
        Generates a custom JWT and registers identity on Photon.
        """

        payload = {
            "sub": user_id,
            "email": email,
            "name": name,
            "iat": int(time.time()),
            "exp": int(time.time()) + 3600,
            "iss": "Aptos-Karma-Passport"
        }

        jwt_token = jwt.encode(payload, self.jwt_secret, algorithm="HS256")

        # Photon endpoint expects: provider="jwt", token=<jwt>, client_user_id=<id>
        return self.client.register_identity(jwt_token, user_id)

    # ------------------------------------------------------
    # 2. REWARDED EVENT
    # ------------------------------------------------------
    def reward_event(self, campaign_id: str, user_id: str, metadata: dict):
        """
        metadata MUST contain access_token returned from /onboard.
        """

        if "access_token" not in metadata:
            raise Exception("Missing 'access_token' in metadata")

        access_token = metadata["access_token"]

        event_data = {
            "event_id": f"reward-{int(time.time())}",
            "event_type": "game_win",          # Photon requires real event types
            "client_user_id": user_id,
            "campaign_id": campaign_id,
            "metadata": {},
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        }

        # MUST pass event_data + access_token
        return self.client.rewarded_event(event_data, access_token)

    # ------------------------------------------------------
    # 3. UNREWARDED EVENT
    # ------------------------------------------------------
    def unreward_event(self, campaign_id: str, user_id: str, metadata: dict):
        """
        metadata MUST contain access_token returned from /onboard.
        """

        if "access_token" not in metadata:
            raise Exception("Missing 'access_token' in metadata")

        access_token = metadata["access_token"]

        event_data = {
            "event_id": f"unreward-{int(time.time())}",
            "event_type": "daily_login",       # Photon accepted type
            "client_user_id": user_id,
            "campaign_id": campaign_id,
            "metadata": {},
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        }

        return self.client.unrewarded_event(event_data, access_token)
