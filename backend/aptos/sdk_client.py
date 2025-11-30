# backend/aptos/sdk_client.py
import requests
import json
import os
from backend.utils.constants import APTOS_NODE_URL

class AptosClient:
    def __init__(self, node_url: str = APTOS_NODE_URL):
        self.node_url = node_url.rstrip("/")

    def _get(self, endpoint: str):
        url = f"{self.node_url}{endpoint}"
        r = requests.get(url, timeout=10)
        if r.status_code >= 400:
            raise Exception(f"Aptos REST Error: {r.text}")
        return r.json()

    def _post(self, endpoint: str, payload: dict):
        url = f"{self.node_url}{endpoint}"
        r = requests.post(url, json=payload, timeout=10)
        if r.status_code >= 400:
            raise Exception(f"Aptos REST Error: {r.text}")
        return r.json()

    # -----------------------------------------------------------
    #  ACCOUNT / RESOURCE HELPERS
    # -----------------------------------------------------------

    def get_account_resource(self, address: str, resource_type: str):
        try:
            return self._get(f"/accounts/{address}/resource/{resource_type}")
        except:
            return {}

    def has_resource(self, address: str, resource_type: str):
        res = self.get_account_resource(address, resource_type)
        return "data" in res

    def get_account_modules(self, address: str):
        return self._get(f"/accounts/{address}/modules")

    # -----------------------------------------------------------
    #  ENTRY FUNCTION PAYLOAD BUILDER
    # -----------------------------------------------------------

    def build_entry_payload(self, module_addr: str, module: str, fn: str,
                            type_args: list, args: list):
        """
        Build Aptos entry function payload (NOT signed).
        Returned payload must be signed client-side.
        """
        return {
            "type": "entry_function_payload",
            "function": f"{module_addr}::{module}::{fn}",
            "type_arguments": type_args,
            "arguments": args
        }

    # -----------------------------------------------------------
    #  TRANSACTION SUBMISSION / SIMULATION
    # -----------------------------------------------------------

    def submit_transaction(self, signed_tx: dict):
        return self._post("/transactions", signed_tx)

    def simulate_transaction(self, tx: dict):
        return self._post("/transactions/simulate", tx)
