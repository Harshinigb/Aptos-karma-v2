# backend/aptos/view_functions/get_payment_history.py
import requests
import os

INDEXER_URL = os.getenv("APTOS_INDEXER_URL", "https://indexer.mainnet.aptoslabs.com/v1/graphql")

QUERY = """
query PaymentHistory($address: String!) {
  events(
    where: {
      account_address: {_eq: $address},
      event_type: {_like: "%payments::PaymentEvent%"}
    },
    order_by: { transaction_version: desc }
  ) {
    transaction_version
    event_index
    type
    data
    timestamp
  }
}
"""

def get_payment_history(address: str):
    """
    Query Aptos Indexer for all payment events involving this address.
    """
    resp = requests.post(INDEXER_URL, json={
        "query": QUERY,
        "variables": {"address": address}
    })

    data = resp.json()

    if "errors" in data:
        return {"payments": []}

    return {
        "payments": data["data"]["events"]
    }
