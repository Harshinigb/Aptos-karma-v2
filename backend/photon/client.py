# backend/photon/client.py
import requests
from backend.utils.constants import PHOTON_API_URL, PHOTON_API_KEY


class PhotonClient:
    def __init__(self):
        self.base = PHOTON_API_URL
        self.key = PHOTON_API_KEY
        self.headers = {
            "Content-Type": "application/json",
            "X-API-Key": self.key
        }

    def post(self, endpoint: str, payload: dict, access_token: str = None):
        url = f"{self.base}{endpoint}"

        headers = self.headers.copy()
        if access_token:
            headers["Authorization"] = f"Bearer {access_token}"

        r = requests.post(url, json=payload, headers=headers)

        if r.status_code >= 400:
            raise Exception(f"Photon Error: {r.text}")

        return r.json()

    # -----------------------------
    # 1. REGISTER (ONBOARD)
    # -----------------------------
    def register_identity(self, jwt_token: str, user_id: str):
        payload = {
            "provider": "jwt",
            "data": {
                "token": jwt_token,
                "client_user_id": user_id
            }
        }
        return self.post("/identity/register", payload)

    # -----------------------------
    # 2. REWARDED EVENT
    # -----------------------------
    def rewarded_event(self, event_data: dict, access_token: str):
        return self.post(
            "/attribution/events/campaign",
            event_data,
            access_token
        )

    # -----------------------------
    # 3. UNREWARDED EVENT
    # -----------------------------
    def unrewarded_event(self, event_data: dict, access_token: str):
        return self.post(
            "/attribution/events/campaign",
            event_data,
            access_token
        )
