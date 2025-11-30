# backend/tests/test_work.py
import pytest
from backend.api.services.workgem_service import WorkGemService

def test_submit_work_payload():
    svc = WorkGemService()
    payload = svc.submit_work("0xEMP", "hash123", 10)

    assert payload["type"] == "entry_function_payload"
    assert "submit_work" in payload["function"]
    assert payload["arguments"][0] == "0xEMP"
    assert payload["arguments"][1] == "hash123"

def test_approve_work_payload():
    svc = WorkGemService()
    payload = svc.approve_work("0xCOMP", "0xEMP", "work-1")

    assert "approve_work" in payload["function"]
    assert payload["arguments"] == ["0xCOMP", "0xEMP", "work-1"]
