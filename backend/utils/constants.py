# backend/utils/constants.py
import os
from dotenv import load_dotenv

load_dotenv()

### --- Blockchain Endpoints --- ###
APTOS_NODE_URL = os.getenv("APTOS_NODE_URL", "https://fullnode.devnet.aptoslabs.com/v1")
APTOS_INDEXER_URL = os.getenv("APTOS_INDEXER_URL", "https://indexer.devnet.aptoslabs.com/v1/graphql")

### --- Core Contract Addresses (REPLACE WITH REAL DEPLOYED ADDRESSES) --- ###
DEPLOYED = "0x7c474757235c6a0d26f8bae5af91089b2714ebe316cbac7d3e4081159ebc36ae"

MODULE_ADDRESS_WORK_GEM = DEPLOYED
MODULE_ADDRESS_PASSPORT = DEPLOYED
MODULE_ADDRESS_LOAN_POOL = DEPLOYED
MODULE_ADDRESS_PAYMENTS = DEPLOYED
MODULE_ADDRESS_ORACLE = DEPLOYED

### --- Photon --- ###
PHOTON_API_URL = "https://stage-api.getstan.app/identity-service/api/v1"
PHOTON_API_KEY = "7bc5d06eb53ad73716104742c7e8a5377da9fe8156378dcfebfb8253da4e8800"

### --- Oracle --- ###
ORACLE_URL = "http://127.0.0.1:7000"

### --- Chain Info --- ###
NETWORK = "devnet"
CHAIN_ID = 34
