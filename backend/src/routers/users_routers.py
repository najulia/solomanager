from fastapi import APIRouter,  HTTPException, status
from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm
from infra.config.database import get_db
from schemas import schemas
from infra.repositories.users import UserRepo
from infra.models import models
from sqlalchemy.orm import Session
from infra.providers import hash_provider, token_provider
from infra.providers.token_provider import get_current_user
from typing import List, Optional

router = APIRouter()

@router.post('/signup', status_code=status.HTTP_201_CREATED)
def create_user(user:schemas.User, db:Session = Depends(get_db)):

    user_email = UserRepo(db).get_by_email(user.email)
    if user_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered" )
    user.password = hash_provider.get_password_hash(user.password)
    created_user = UserRepo(db).create(user)
    return created_user

@router.get('/users/', response_model=list[schemas.User])
def list_users(db:Session = Depends(get_db)):
    return UserRepo(db).read()

@router.get('/users/{id_user}', response_model=schemas.User)
def list_by_id(id_user:int, db:Session = Depends(get_db)):
    user = UserRepo(db).read_by_id(id_user=id_user)
    if not user:
        raise HTTPException(status_code=404, detail=f"user com o id {id_user} não existe")
    return user

@router.put('/users/{id_user}', response_model=schemas.User)
def update_user(id_user:int, new_data:dict, current_user: schemas.User = Depends(get_current_user), db:Session = Depends(get_db)):
    return UserRepo(db).update(id_user=id_user, new_data=new_data)

@router.post('/token')
def login(login_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    print(f"Login recebido: {login_data.username}, {login_data.password}")
    password = login_data.password
    email = login_data.username  # username na verdade eh o email 
    
    user = UserRepo(db).get_by_email(email)
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
    
    correct_password = hash_provider.verify_password(password, user.password)
    if not correct_password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect password")
    
    token = token_provider.create_access_token({"sub": user.id})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/users/me/", response_model=schemas.User)
async def read_users_me(
    current_user: schemas.User = Depends(token_provider.get_current_user), 
    db: Session = Depends(get_db)
):
    return current_user
    
@router.get('/me/products', response_model=list[schemas.Product])
def list_my_products(current_user: schemas.User = Depends(get_current_user), db: Session = Depends(get_db)):
    products = db.query(models.Product).filter(models.Product.user_id == current_user.id).all()
    return products

@router.get('/me/orders', response_model=list[schemas.OrderPublic])
def list_my_orders(current_user: schemas.User = Depends(get_current_user), db: Session = Depends(get_db)):
    orders = db.query(models.Order).filter(models.Order.user_id == current_user.id).all()
    return orders

@router.get("/test-auth")
async def test_auth(current_user = Depends(get_current_user)):
    return {
        "message": "Authentication successful",
        "user_id": current_user.id,
        "email": current_user.email
    }