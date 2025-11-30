# backend/api/services/loan_service.py
from backend.aptos.entry_functions.borrow import build_borrow_payload
from backend.aptos.entry_functions.repay import build_repay_payload


class LoanService:
    BASE_LIMIT = 50
    TIER_BOOST = [0, 25, 50, 100]  # Tier 0 → Tier 3

    def calculate_limit(self, score: int, tier: int):
        """
        Off-chain computation of the max loan amount using
        reputation (score) + on-chain tier (Karma Passport).
        """
        return self.BASE_LIMIT + (score // 2) + self.TIER_BOOST[tier]

    def request_borrow(self, address: str, amount: int):
        """
        Builds the Aptos transaction payload for borrowing.
        (Signed client-side → submitted by wallet)
        """
        payload = build_borrow_payload(address, amount)
        return {
            "status": "borrow-requested",
            "tx": payload
        }

    def request_repay(self, address: str, amount: int):
        """
        Builds the Aptos transaction payload for repayment.
        """
        payload = build_repay_payload(address, amount)
        return {
            "status": "repay-requested",
            "tx": payload
        }
