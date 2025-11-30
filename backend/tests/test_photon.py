# backend/tests/test_photon.py
import pytest
import requests_mock
from backend.photon.client import PhotonClient
from backend.photon.jwt_builder import build_jwt

def test_photon_identity_register():
    client = PhotonClient()
    jwt = build_jwt("user123")

    with requests_mock.Mocker() as mock:
        mock.post(client.base + "/identity/register", json={"status": "ok", "user": "user123"})

        res = client.register_identity(jwt)
        assert res["status"] == "ok"

def test_photon_reward_event():
    client = PhotonClient()

    with requests_mock.Mocker() as mock:
        mock.post(client.base + "/campaign/event/reward", json={"reward": 50})
        res = client.rewarded_event({"campaign_id": "C1", "user_id": "U1", "metadata": {}})
        assert res["reward"] == 50

def test_photon_embedded_wallet():
    client = PhotonClient()

    with requests_mock.Mocker() as mock:
        mock.post(client.base + "/wallet/create", json={"wallet": "0xWALLETON"})
        res = client.create_embedded_wallet("userXYZ")
        assert res["wallet"] == "0xWALLETON"
