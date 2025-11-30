# backend/aptos/constants.py
import os
from dotenv import load_dotenv

load_dotenv()

# Replace these after deploying your Move modules
MODULE_ADDRESS_WORK_GEM = os.getenv("MODULE_ADDRESS_WORK_GEM", "0xworkgem_module")
MODULE_ADDRESS_PASSPORT = os.getenv("MODULE_ADDRESS_PASSPORT", "0xpassport_module")
MODULE_ADDRESS_LOAN_POOL = os.getenv("MODULE_ADDRESS_LOAN_POOL", "0xloanpool_module")
MODULE_ADDRESS_PAYMENTS = os.getenv("MODULE_ADDRESS_PAYMENTS", "0xpayments_module")

# Network + URLs
NETWORK = os.getenv("APTOS_NETWORK", "mainnet")
CHAIN_ID = int(os.getenv("APTOS_CHAIN_ID", 1))

APTOS_NODE_URL = os.getenv("APTOS_NODE_URL",
    "https://fullnode.mainnet.aptoslabs.com/v1")

APTOS_INDEXER_URL = os.getenv("APTOS_INDEXER_URL",
    "https://indexer.mainnet.aptoslabs.com/v1/graphql")
