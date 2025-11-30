# backend/api/services/payment_service.py
from backend.aptos.entry_functions.send_payment import build_payment_payload

class PaymentService:
    def generate_qr(self, sender: str, receiver: str, amount: int):
        return {
            "qr_data": f"{sender}:{receiver}:{amount}",
            "amount": amount,
            "from": sender,
            "to": receiver,
        }

    def send_payment(self, sender: str, receiver: str, amount: int):
        payload = build_payment_payload(sender, receiver, amount)
        return payload
