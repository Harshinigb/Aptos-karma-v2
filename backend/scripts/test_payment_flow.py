# backend/scripts/test_payment_flow.py
from api.services.payment_service import PaymentService

def main():
    sender = "0xSender..."
    receiver = "0xReceiver..."
    amount = 2500  # smallest units

    svc = PaymentService()

    print("\n--- Generate QR ---")
    qr = svc.generate_qr(sender, receiver, amount)
    print("QR CODE DATA:", qr)

    print("\n--- Build Payment Payload ---")
    payment_payload = svc.send_payment(sender, receiver, amount)
    print("Payment Payload:", payment_payload)

    print("\n--- This payload should now be signed client-side & submitted\n")

if __name__ == "__main__":
    main()
