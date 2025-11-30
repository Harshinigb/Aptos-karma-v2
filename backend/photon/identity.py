# backend/photon/identity.py
from photon.client import PhotonClient

client = PhotonClient()

def register_identity(jwt_token: str):
    return client.register_identity(jwt_token)
