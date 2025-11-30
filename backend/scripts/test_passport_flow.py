# backend/scripts/test_passport_flow.py
import time
from api.services.oracle_service import OracleService
from aptos.entry_functions.update_passport import build_update_passport_payload

def main():
    address = "0xUser..."

    print("\n--- Oracle Score Test ---")
    oracle = OracleService()

    features = {
        "xp": 120,
        "reliability": 0.88,
        "work_count": 7
    }

    oracle_output = oracle.get_signed_score(address, features)

    print("Oracle Payload:", oracle_output["oracle_payload"])
    print("Oracle Signature:", oracle_output["signature"])

    print("\n--- Build On-Chain Passport Update Transaction ---")
    p = oracle_output["oracle_payload"]

    tx_payload = build_update_passport_payload(
        address,
        p["score"],
        p["timestamp"],
        oracle_output["signature"]
    )

    print("Move TX Payload:")
    print(tx_payload)

    print("\nNow sign + submit this payload using wallet/Aptos client.\n")

if __name__ == "__main__":
    main()
