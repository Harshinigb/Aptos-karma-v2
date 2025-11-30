# backend/photon/rewarded_event.py
from photon.client import PhotonClient

client = PhotonClient()

def trigger_rewarded_event(campaign_id: str, user_id: str, metadata: dict):
    payload = {
        "campaign_id": campaign_id,
        "user_id": user_id,
        "metadata": metadata
    }
    return client.rewarded_event(payload)
