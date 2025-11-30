# backend/photon/unrewarded_event.py
from photon.client import PhotonClient

client = PhotonClient()

def trigger_unrewarded_event(campaign_id: str, user_id: str, metadata: dict):
    payload = {
        "campaign_id": campaign_id,
        "user_id": user_id,
        "metadata": metadata
    }
    return client.unrewarded_event(payload)
