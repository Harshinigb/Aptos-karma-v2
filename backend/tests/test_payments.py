# backend/tests/test_payments.py
from backend.api.services.payment_service import PaymentService

def test_generate_qr():
    svc = PaymentService()
    qr = svc.generate_qr("0xA", "0xB", 5000)

    assert qr["from"] == "0xA"
    assert qr["to"] == "0xB"
    assert qr["amount"] == 5000

def test_payment_payload():
    svc = PaymentService()
    payload = svc.send_payment("0xA", "0xB", 2000)

    assert payload["type"] == "entry_function_payload"
    assert "payments::pay" in payload["function"]
    assert payload["arguments"] == ["0xA", "0xB", 2000, ""]
