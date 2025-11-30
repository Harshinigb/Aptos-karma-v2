# backend/utils/formatter.py
def format_amount(amount: int) -> str:
    return f"{amount:,}"

def format_score(score: int) -> str:
    return f"{score} pts"

def format_xp(xp: int) -> str:
    return f"{xp} XP"

def format_tier(tier: int) -> str:
    return f"T{tier}"

def format_time(ts: int) -> str:
    import datetime
    return datetime.datetime.utcfromtimestamp(ts).strftime("%Y-%m-%d %H:%M:%S")
