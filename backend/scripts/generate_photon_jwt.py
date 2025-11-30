# backend/scripts/generate_photon_jwt.py
import uuid
from photon.jwt_builder import build_jwt

def main():
    user_id = str(uuid.uuid4())
    email = "demo@example.com"
    name = "Demo User"

    jwt_token = build_jwt(user_id, email, name)
    print("\n--- Photon JWT Generated ---")
    print(jwt_token)
    print("-----------------------------\n")

if __name__ == "__main__":
    main()
