# backend/api/services/role_service.py
from aptos.view_functions.get_role_info import get_role_info

class RoleService:
    def detect_role(self, address: str):
        role = get_role_info(address)

        if role.get("is_company"):
            return "company"
        if role.get("is_provider"):
            return "provider"
        if role.get("has_work_gems"):
            return "employee"
        
        return "user"
