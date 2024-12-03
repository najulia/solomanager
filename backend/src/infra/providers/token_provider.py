from datetime import datetime, timedelta, timezone
from typing import Annotated
import jwt
from sqlalchemy.orm import Session
from infra.config.database import get_db
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from pydantic import BaseModel
from infra.repositories.users import UserRepo

SECRET_KEY = "bdfa0acc400939819b9afc23bf462d66e57b0500"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 3600
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()

    if "sub" in to_encode:
        to_encode["sub"] = str(to_encode["sub"]) #converte o sub para string

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=3600)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token:str):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return payload.get("sub")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        # Decodificando o token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(f"Received token: {token}")

        # Garantir que 'sub' seja uma string
        id = payload.get("sub")
        if id is None:
            raise credentials_exception
        id = str(id)  # Garantir que 'sub' é tratado como string
        print(f"Token payload: {payload}")
        print(f"Extracted ID: {id}")
    except InvalidTokenError as e:
        print(f"Token decode failed: {e}")
        raise credentials_exception

    # Consulta ao banco com 'id' como string
    user = UserRepo(db).read_by_id(id_user=id)
    print(f"Found user: {user}")

    if user is None:
        raise credentials_exception
    return user