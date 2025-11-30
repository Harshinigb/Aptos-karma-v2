# backend/api/services/provider_service.py
from backend.aptos.entry_functions.deposit_pool import build_deposit_payload
from backend.aptos.entry_functions.withdraw_pool import build_withdraw_payload

class ProviderService:
    def deposit(self, provider: str, amount: int):
        payload = build_deposit_payload(provider, amount)
        return payload

    def withdraw(self, provider: str, amount: int):
        payload = build_withdraw_payload(provider, amount)
        return payload
