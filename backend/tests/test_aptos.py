# backend/tests/test_aptos.py
import pytest
import requests_mock
from backend.aptos.sdk_client import AptosClient
from backend.aptos.indexer_client import IndexerClient

def test_sdk_client_get_resource():
    client = AptosClient("https://aptos-node.com/v1")

    with requests_mock.Mocker() as mock:
        mock.get("https://aptos-node.com/v1/accounts/0xA/resource/X::Y::Z",
                 json={"data": {"score": 42}})

        res = client.get_account_resource("0xA", "X::Y::Z")
        assert res["data"]["score"] == 42

def test_indexer_query():
    client = IndexerClient("https://indexer.net/graphql")

    gql = "query Test { events { type } }"

    with requests_mock.Mocker() as mock:
        mock.post("https://indexer.net/graphql", json={
            "data": {
                "events": [{"type": "test::evt"}]
            }
        })

        res = client.query(gql)
        assert res["events"][0]["type"] == "test::evt"
