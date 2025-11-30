# backend/photon/token_refresh.py
from photon.client import PhotonClient

client = PhotonClient()

def refresh_photon_token(refresh_token: str):
    return client.refresh_token(refresh_token)
