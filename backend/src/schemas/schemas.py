from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime
from typing import List, Optional
import re

class User(BaseModel):
    id: Optional[int] = None
    name: str 
    email: EmailStr
    password: str 
    role: str
    is_active: bool = True
    products: Optional[List['Product']] = None

    @field_validator('name') 
    def validate_name(cls, value): 
        if not value or not value.strip(): raise ValueError('Name cannot be empty') 
        if not re.match("^[A-Za-zÀ-ÿ ]+$", value): 
            raise ValueError('Name cannot contain special characters or numbers') 
        return value

class LoginData(BaseModel):
    email: str
    password: str 


class Product(BaseModel):
    id: Optional[int] = None
    name: str
    category: str
    stock: int 
    price: float 
    picture: str 
    user_id: Optional[int] = None

    class Config:
        orm_mode = True 

class Order(BaseModel): 
    id: Optional[int] = None
    customer_name: str
    customer_phone: str
    payment_method: str
    payment_status: str
    quantity: int
    product_id: int

    class Config:
        orm_mode = True 

class OrderPublic(BaseModel): 
    id: Optional[int] = None
    customer_name: str
    customer_phone: str
    payment_method: str
    payment_status: str
    quantity: int
    total: float 
    product: Optional[Product]
