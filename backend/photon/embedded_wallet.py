# backend/photon/embedded_wallet.py
from photon.client import PhotonClient

client = PhotonClient()

def create_embedded_wallet(user_id: str):
    return client.create_embedded_wallet(user_id)
