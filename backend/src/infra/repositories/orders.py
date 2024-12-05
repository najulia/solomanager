from sqlalchemy.orm import Session, session
from schemas import schemas
from infra.models import models
from sqlalchemy import update
from fastapi import HTTPException

class OrderRepo():
    def __init__(self, db:Session):
        self.db = db

    def create(self, order:schemas.Order):

        product = self.db.query(models.Product).filter(models.Product.id == order.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Produto com o id {order.product_id} não existe")
        
        remaining_stock = product.stock - order.quantity

        if remaining_stock < 0:
            raise HTTPException(status_code=400, detail="Estoque insuficiente.")

        db_order = models.Order(
            customer_name = order.customer_name,
            customer_phone = order.customer_phone, 
            payment_method = order.payment_method,
            payment_status = order.payment_status,
            quantity = order.quantity, 
            product_id = order.product_id, 
            user_id = order.user_id,
        )
        db_order.product = product
        db_order.calculate_total()
        product.stock -= order.quantity

        self.db.add(db_order)
        self.db.commit()
        self.db.refresh(db_order)
        return db_order

    def read(self):
        return self.db.query(models.Order).all()

    def read_by_id(self, id_order:int):
        return self.db.query(models.Order).filter(models.Order.id==id_order).first()

    def update(self, id_order:int, new_data:dict):
        new_order = self.db.query(models.Order).filter(models.Order.id == id_order).first()
        for key, value in new_data.items():
            setattr(new_order, key, value)
        self.db.commit()
        return new_order

    def deactivate(self):
        pass

    def activate(self):
        pass