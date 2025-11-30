# backend/oracle/feature_extractor.py
"""
Feature extractor: collects simple features from on-chain WorkGems / Passport resources.
This implementation uses a light local approach that calls the Aptos Indexer or sdk_client.
"""

import os
import time
from typing import Dict, Any
from backend.aptos.indexer_client import IndexerClient
from backend.aptos.sdk_client import AptosClient

INDEXER = IndexerClient()
SDK = AptosClient()

async def extract_default_features(address: str) -> Dict[str, Any]:
    """
    Builds a default feature set:
    - xp (from passport resource)
    - work_count (number of work entries)
    - reliability (0..1) estimated from approvals ratio
    - recent_activity_days (days since last work)
    """
    # Attempt to read passport resource via SDK first
    try:
        # resource type depends on your module address; use aptos.constants if available
        from aptos.constants import MODULE_ADDRESS_PASSPORT as P_ADDR
        resource_type = f"{P_ADDR}::passport::Passport"
        res = SDK.get_account_resource(address, resource_type)
        data = res.get("data", {}) if res else {}
    except Exception:
        data = {}

    xp = int(data.get("xp", 0))
    work_gems = data.get("work_gems", []) or []

    # If passport resource not present, fallback to indexer queries to find work events
    if not work_gems:
        # Query indexer for events (this GraphQL is example-based; adapt to your indexer schema)
        q = """
        query ($addr: String!) {
          events(
            where: {
              event_account: {_eq: $addr},
              event_type: {_like: "%work_gem%"}
            },
            order_by: { transaction_version: desc },
            limit: 100
          ) {
            transaction_version
            data
          }
        }
        """
        try:
            data_idx = INDEXER.query(q, {"addr": address})
            evs = data_idx.get("events", []) if data_idx else []
            # Map events to simplified work gems
            work_gems = []
            for e in evs:
                work_gems.append(e.get("data", {}))
        except Exception:
            work_gems = []

    work_count = len(work_gems)

    # calculate approvals ratio and recent activity
    approved = 0
    last_ts = None
    for w in work_gems:
        if isinstance(w, dict):
            if w.get("approved") or w.get("approved", False):
                approved += 1
            # support both timestamp fields
            t = w.get("timestamp") or w.get("ts") or w.get("created_at")
            if t:
                try:
                    t_int = int(t)
                    if not last_ts or t_int > last_ts:
                        last_ts = t_int
                except:
                    pass

    reliability = (approved / work_count) if work_count > 0 else 0.0
    now = int(time.time())
    recent_days = ((now - last_ts) / 86400.0) if last_ts else 365.0

    features = {
        "xp": xp,
        "work_count": work_count,
        "reliability": round(float(reliability), 3),
        "recent_activity_days": round(float(recent_days), 2)
    }
    return features
