# backend/api/services/passport_service.py

from typing import Dict, Any

# Import the on-chain passport view function
# Matches: backend/aptos/view_functions/get_passport_info.py
from backend.aptos.view_functions.get_passport_info import get_passport_info


class PassportService:
    """
    PassportService handles off-chain formatting of on-chain passport data.
    """

    def __init__(self):
        pass

    def get_passport(self, address: str) -> Dict[str, Any]:
        """
        Reads passport data from the chain via Aptos view function and normalizes it.
        Returned structure MUST match the format used by backend + tests.
        """
        raw = get_passport_info(address) or {}

        # Normalize values with safe defaults
        score = int(raw.get("score", 0))
        xp = int(raw.get("xp", 0))
        tier = int(raw.get("tier", 0))
        work_gems = raw.get("work_gems", []) or []

        return {
            "address": address,
            "score": score,
            "xp": xp,
            "tier": tier,
            "work_gems": work_gems,
        }

    def format_passport(self, address: str, score: int, xp: int, tier: int) -> Dict[str, Any]:
        """
        A helper method ONLY used for unit testing.
        Produces a normalized passport dict (score, xp, tier).
        Tests rely on this exact structure.
        """
        return {
            "address": address,
            "score": int(score),
            "xp": int(xp),
            "tier": int(tier),
            "work_gems": [],  # consistent with Passport format
        }
