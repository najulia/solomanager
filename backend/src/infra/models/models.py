from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, DateTime, func
from sqlalchemy.orm import relationship, validates
from infra.config.database import Base
from typing import List
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
from fastapi import HTTPException, status
from infra.validators import user_validators, order_validators

class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(255))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True) 

    user_products: Mapped[List["Product"]] = relationship("Product", back_populates="owner",
                                                       cascade="all, delete-orphan")
    
    user_orders: Mapped[List["Order"]] = relationship("Order", back_populates="user", 
                                                      cascade="all, delete-orphan")

    @validates("role")
    def check_role(self, key, value):
        return user_validators.validate_role(value) 

class Product(Base):
    __tablename__ = 'products'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(255), nullable=False)
    stock: Mapped[int] = mapped_column(Integer(), nullable=False)
    price: Mapped[float] = mapped_column(Float())
    picture: Mapped[str] = mapped_column(String(255))

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    owner: Mapped[User] = relationship("User", back_populates="user_products")

    order_products: Mapped[List["Order"]] = relationship("Order", back_populates="product", 
                                                         cascade="all, delete-orphan")
    
    def calculate_remaining_stock(self):
        total_sold = sum(order.quantity for order in self.order_products)
        self.stock -= total_sold

class Order(Base):
    __tablename__ = 'orders'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    customer_name: Mapped[str] = mapped_column(String(255), nullable=False)
    customer_phone: Mapped[str] = mapped_column(String(255), nullable=False)
    payment_method: Mapped[str] = mapped_column(String(255), nullable=False)
    payment_status: Mapped[str] = mapped_column(String(255), default="em análise")
    quantity: Mapped[int] = mapped_column(nullable=False)
    total: Mapped[float] = mapped_column(Float(), nullable=True)

    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"))
    product: Mapped[Product] = relationship("Product", back_populates="order_products")

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped[User] = relationship("User", back_populates="user_orders")

#VALIDAÇÕES DO MODELO DE PEDIDOS

    @validates('payment_status')
    def validate_payment_status_field(self, key, value):
        return order_validators.validate_payment_status(value)

    @validates('client_phone')
    def validate_client_phone_field(self, key, value):
        return order_validators.validate_client_phone(value)

    @validates('client_name')
    def validate_client_name_field(self, key, value):
        return order_validators.validate_client_name(value)


    def calculate_total(self):
        if self.product and self.quantity:
            print(f"Produto: {self.product.name}, Quantidade: {self.quantity}, Preço: {self.product.price}")
            self.total = self.quantity * self.product.price
        else:
            self.total = 0.0  

    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.calculate_total()
