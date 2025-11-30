# backend/api/dependencies.py
from fastapi import Header, HTTPException, Depends
from utils.jwt_utils import decode_jwt
from api.services.role_service import RoleService

role_service = RoleService()

# -------------------------------------------------------------
# Extract & validate JWT from request headers
# -------------------------------------------------------------
def get_current_user(authorization: str = Header(None)):
    """
    Expected format:
        Authorization: Bearer <token>
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid Authorization header")

    token = authorization.split(" ")[1]
    payload = decode_jwt(token)

    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return payload


# -------------------------------------------------------------
# Inject user role into endpoints
# -------------------------------------------------------------
def get_user_role(user=Depends(get_current_user)):
    address = user["address"]
    roles = role_service.detect_role(address)
    
    # Determine final role string
    if roles["is_company"]:
        role = "company"
    elif roles["is_provider"]:
        role = "provider"
    elif roles["is_employee"]:
        role = "employee"
    else:
        role = "user"

    roles["role"] = role

    return {
        "address": address,
        "role": role,
        **roles
    }
