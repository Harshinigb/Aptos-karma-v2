# backend/api/services/oracle_service.py

import requests
from backend.utils.constants import ORACLE_URL


class OracleService:
    def __init__(self):
        self.base = ORACLE_URL  # Example: http://127.0.0.1:7000

    def get_score(self, address: str):
        """
        Calls the local Oracle microservice running on port 7000
        POST /score { "address": "0xabc" }
        """

        url = f"{self.base}/score"
        payload = {"address": address}

        try:
            r = requests.post(url, json=payload)
            r.raise_for_status()
            return r.json()
        except Exception as e:
            raise Exception(f"OracleService error: {str(e)}")
