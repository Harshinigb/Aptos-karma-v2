# backend/aptos/indexer_client.py
import requests
import os
from backend.utils.constants import APTOS_INDEXER_URL

class IndexerClient:
    def __init__(self, url: str = APTOS_INDEXER_URL):
        self.url = url

    def query(self, gql: str, variables: dict = None):
        """Generic helper for sending GraphQL queries."""
        res = requests.post(
            self.url,
            json={"query": gql, "variables": variables or {}},
            timeout=10
        )

        data = res.json()
        if "errors" in data:
            raise Exception(f"Indexer Error: {data['errors']}")

        return data["data"]

    # Example: paginate through large results
    def paginated_query(self, gql: str, key: str, variables: dict = None, limit: int = 100):
        results = []
        cursor = None

        while True:
            vars_with_page = {**(variables or {}), "cursor": cursor, "limit": limit}
            data = self.query(gql, vars_with_page)
            batch = data.get(key, [])

            if not batch:
                break

            results.extend(batch)

            # Stop if no more pages
            if len(batch) < limit:
                break

            cursor = batch[-1]["transaction_version"]

        return results
