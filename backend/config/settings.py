# backend/config/settings.py
import os
from dotenv import load_dotenv
from pydantic import BaseSettings

load_dotenv()

class Settings(BaseSettings):
    # --------------------------------------------------------------
    # APPLICATION
    # --------------------------------------------------------------
    ENV: str = os.getenv("ENV", "development")            # dev / prod / test
    DEBUG: bool = os.getenv("DEBUG", "true").lower() == "true"
    API_NAME: str = "Aptos Karma Passport Backend"
    VERSION: str = "1.0.0"

    # --------------------------------------------------------------
    # JWT AUTH
    # --------------------------------------------------------------
    JWT_SECRET: str = os.getenv("JWT_SECRET", "dev_secret_key")
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_SECONDS: int = 24 * 3600

    # --------------------------------------------------------------
    # APTOS CONFIG
    # --------------------------------------------------------------
    APTOS_NODE_URL: str = os.getenv("APTOS_NODE_URL", "https://fullnode.mainnet.aptoslabs.com/v1")
    APTOS_INDEXER_URL: str = os.getenv("APTOS_INDEXER_URL", "https://indexer.mainnet.aptoslabs.com/v1/graphql")
    APTOS_NETWORK: str = os.getenv("APTOS_NETWORK", "mainnet")
    APTOS_CHAIN_ID: int = int(os.getenv("APTOS_CHAIN_ID", 1))

    # Move module addresses
    MODULE_ADDRESS_WORK_GEM: str = os.getenv("MODULE_ADDRESS_WORK_GEM", "0xworkgem")
    MODULE_ADDRESS_PASSPORT: str = os.getenv("MODULE_ADDRESS_PASSPORT", "0xpassport")
    MODULE_ADDRESS_LOAN_POOL: str = os.getenv("MODULE_ADDRESS_LOAN_POOL", "0xloanpool")
    MODULE_ADDRESS_PAYMENTS: str = os.getenv("MODULE_ADDRESS_PAYMENTS", "0xpayments")

    # --------------------------------------------------------------
    # PHOTON
    # --------------------------------------------------------------
    PHOTON_API_URL: str = os.getenv("PHOTON_API_URL", "https://api.photon.build")
    PHOTON_API_KEY: str = os.getenv("PHOTON_API_KEY", "dev-photon-key")
    PHOTON_JWT_SECRET: str = os.getenv("PHOTON_JWT_SECRET", "demo_photon_secret")

    # --------------------------------------------------------------
    # ORACLE
    # --------------------------------------------------------------
    ORACLE_PRIVATE_KEY_HEX: str = os.getenv("ORACLE_PRIVATE_KEY_HEX", "")
    ORACLE_URL: str = os.getenv("ORACLE_URL", "http://localhost:7000/score")

    # --------------------------------------------------------------
    # LOGGING
    # --------------------------------------------------------------
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "DEBUG")

settings = Settings()
