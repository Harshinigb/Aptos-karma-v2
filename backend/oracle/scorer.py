# backend/oracle/scorer.py
"""
Scoring logic for Karma Oracle.

- Uses a lightweight deterministic heuristic by default.
- If OPENAI_API_KEY is set and `use_llm=True`, attempts an LLM-based score (fallback to heuristic).
"""

import os
import requests
import json
from typing import Dict, Any, Tuple

OPENAI_KEY = os.getenv("OPENAI_API_KEY", None)
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")  # change as needed

def heuristic_score(features: Dict[str, Any]) -> Tuple[int, Dict[str, Any]]:
    """
    Simple deterministic scoring function.
    - xp (higher is better)
    - work_count
    - reliability (0..1)
    - recent_activity_days (smaller -> better)
    Returns (score, meta)
    Score range: 0..100
    """
    xp = int(features.get("xp", 0))
    work_count = int(features.get("work_count", 0))
    reliability = float(features.get("reliability", 0.0))
    recent_days = float(features.get("recent_activity_days", 365))

    # Normalize components
    xp_comp = min(xp / 100.0, 1.0)        # xp 0..100+ -> 0..1
    work_comp = min(work_count / 10.0, 1.0)  # 10+ works -> 1.0
    rel_comp = max(min(reliability, 1.0), 0.0)
    activity_comp = max(0.0, 1.0 - (recent_days / 365.0))  # 0..1

    # weights
    w_xp = 0.30
    w_work = 0.25
    w_rel = 0.30
    w_activity = 0.15

    score_float = (
        xp_comp * w_xp +
        work_comp * w_work +
        rel_comp * w_rel +
        activity_comp * w_activity
    ) * 100.0

    meta = {
        "xp_comp": xp_comp,
        "work_comp": work_comp,
        "rel_comp": rel_comp,
        "activity_comp": activity_comp,
        "weights": {"xp": w_xp, "work": w_work, "rel": w_rel, "activity": w_activity}
    }

    return int(round(score_float)), meta

def llm_score_via_openai(address: str, features: Dict[str, Any]) -> Tuple[int, Dict[str, Any]]:
    """
    Optional: use OpenAI to produce a more nuanced score.
    This calls OpenAI's chat completions and expects a JSON reply with {"score": int, "explain": "..."}.
    If the call fails or response can't be parsed, raises an exception.
    """
    if not OPENAI_KEY:
        raise RuntimeError("OPENAI_API_KEY not configured")

    prompt = """
You are an on-chain reputation oracle. Given the following features for a user address, output a JSON object with fields:
- score: integer 0..100 (higher is better)
- explain: short text explanation
Return only valid JSON.

Features: %s
Address: %s
""" % (json.dumps(features), address)

    # conversational API (fallback to simple completions)
    headers = {
        "Authorization": f"Bearer {OPENAI_KEY}",
        "Content-Type": "application/json"
    }

    body = {
        "model": OPENAI_MODEL,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.2,
        "max_tokens": 300
    }

    # Use api.openai.com/v1/chat/completions
    resp = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=body, timeout=20)
    resp.raise_for_status()
    result = resp.json()
    # Get assistant text
    text = ""
    try:
        text = result["choices"][0]["message"]["content"]
    except Exception:
        raise RuntimeError("OpenAI response parsing failed")

    # Attempt to parse JSON from response
    import re
    import json as _json
    # Extract JSON block
    match = re.search(r"(\{[\s\S]*\})", text)
    if not match:
        raise RuntimeError("No JSON found in LLM response")

    json_text = match.group(1)
    parsed = _json.loads(json_text)

    score = int(parsed.get("score", 0))
    meta = {"llm_explain": parsed.get("explain", ""), "raw": parsed}
    return score, meta

def compute_score(address: str, features: Dict[str, Any], use_llm: bool = False) -> Tuple[int, Dict[str, Any]]:
    """
    Top-level scoring function.
    - If use_llm=True and OPENAI_API_KEY is configured, calls LLM (may be slower / costs tokens)
    - Otherwise uses deterministic heuristic
    Returns (score, meta)
    """
    if use_llm and OPENAI_KEY:
        try:
            return llm_score_via_openai(address, features)
        except Exception as e:
            # fallback to heuristic on LLM failure
            base_score, meta = heuristic_score(features)
            meta["llm_error"] = str(e)
            return base_score, meta

    return heuristic_score(features)
