# backend/aptos/view_functions/get_role_info.py
from aptos.sdk_client import AptosClient

try:
    from aptos.constants import (
        MODULE_ADDRESS_WORK_GEM,
        MODULE_ADDRESS_PASSPORT,
        MODULE_ADDRESS_LOAN_POOL
    )
except:
    MODULE_ADDRESS_WORK_GEM = "0xworkgem"
    MODULE_ADDRESS_PASSPORT = "0xpassport"
    MODULE_ADDRESS_LOAN_POOL = "0xloanpool"

RESOURCE_EMPLOYEE = f"{MODULE_ADDRESS_WORK_GEM}::work_gem::WorkLedger"
RESOURCE_COMPANY = f"{MODULE_ADDRESS_WORK_GEM}::work_gem::CompanyConfig"
RESOURCE_PROVIDER = f"{MODULE_ADDRESS_LOAN_POOL}::micro_loan_pool::ProviderConfig"

client = AptosClient()

def get_role_info(address: str):
    roles = {
        "is_employee": False,
        "is_company": False,
        "is_provider": False
    }

    # employee?
    if client.has_resource(address, RESOURCE_EMPLOYEE):
        roles["is_employee"] = True

    # company?
    if client.has_resource(address, RESOURCE_COMPANY):
        roles["is_company"] = True

    # provider?
    if client.has_resource(address, RESOURCE_PROVIDER):
        roles["is_provider"] = True

    return roles
