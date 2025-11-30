# backend/api/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.routers.auth_router import router as auth_router
from backend.api.routers.user_router import router as user_router
from backend.api.routers.work_router import router as work_router
from backend.api.routers.company_router import router as company_router
from backend.api.routers.loan_router import router as loan_router
from backend.api.routers.provider_router import router as provider_router
from backend.api.routers.payments_router import router as payments_router
from backend.api.routers.photon_router import router as photon_router
from backend.api.routers.oracle_router import router as oracle_router

app = FastAPI(
    title="Aptos Karma Passport Backend",
    description="Backend for WorkGems, Reputation, MicroLoans, Payments & Photon Integration",
    version="1.0.0"
)

# -------------------------------------------------------------
# CORS CONFIG
# -------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ok for hackathon
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------------------
# ROOT
# -------------------------------------------------------------
@app.get("/")
def root():
    return {
        "message": "Aptos Karma Passport Backend Running 🚀",
        "status": "ok",
        "docs": "/docs"
    }

# -------------------------------------------------------------
# ROUTERS
# -------------------------------------------------------------
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(user_router, prefix="/user", tags=["User"])

# IMPORTANT:
# work_router MUST NOT have prefix inside router file
# prefix is applied here ONLY
app.include_router(work_router, prefix="/work", tags=["Work"])

app.include_router(company_router, prefix="/company", tags=["Company"])
app.include_router(loan_router, prefix="/loan", tags=["Loan"])
app.include_router(provider_router, prefix="/provider", tags=["Provider"])
app.include_router(payments_router, prefix="/payments", tags=["Payments"])
app.include_router(photon_router, prefix="/photon", tags=["Photon"])
app.include_router(oracle_router, prefix="/oracle", tags=["AI Oracle"])
