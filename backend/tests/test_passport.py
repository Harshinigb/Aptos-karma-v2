# backend/tests/test_passport.py
import pytest
from backend.api.services.passport_service import PassportService
from backend.aptos.entry_functions.update_passport import build_update_passport_payload

def test_passport_update_payload():
    address = "0x123"
    score = 85
    timestamp = 1700000000
    signature = "abcd1234"

    payload = build_update_passport_payload(address, score, timestamp, signature)

    assert payload["type"] == "entry_function_payload"
    assert "passport::update_score" in payload["function"]
    assert payload["arguments"] == [address, score, timestamp, signature]

def test_passport_service_mock():
    svc = PassportService()
    mock_score = 75

    res = svc.format_passport("0x123", mock_score, 100, 2)
    assert res["score"] == mock_score
    assert res["tier"] == 2
    assert res["xp"] == 100
