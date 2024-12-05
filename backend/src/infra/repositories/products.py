from sqlalchemy.orm import Session
from schemas import schemas
from infra.models import models
from fastapi import Depends
from infra.providers.token_provider import get_current_user

class ProductRepo():

    def __init__(self, db:Session):
        self.db = db

    def create(self, product:schemas.Product):
        
        db_product = models.Product(
            name = product.name,
            category = product.category, 
            stock = product.stock, 
            price = product.price, 
            picture = product.picture, 
            user_id=product.user_id
        )

        self.db.add(db_product)
        self.db.commit()
        self.db.refresh(db_product)
        return db_product

    def read(self):
        return self.db.query(models.Product).all()

    def read_by_id(self, id_product:int):
        return self.db.query(models.Product).filter(models.Product.id==id_product).first()

    def update(self, id_product:int, new_data:dict):
        new_product = self.db.query(models.Product).filter(models.Product.id == id_product).first()
        for key, value in new_data.items():
            setattr(new_product, key, value)
        self.db.commit()
        return new_product

    def delete(self, id_product:int):
        product = self.db.query(models.Product).filter(models.Product.id == id_product).first()
        if product:
            self.db.delete(product)  
            self.db.commit() 