from sqlalchemy.orm import Session, session
from schemas import schemas
from infra.models import models
from sqlalchemy import update

class OrderRepo():
    def __init__(self, db:Session):
        self.db = db

    def create(self, order:schemas.Order):
        db_order = models.Order(
            client_name = order.client_name,
            client_phone = order.client_phone, 
            payment_method = order.payment_method,
            payment_status = order.payment_status,
            quantity = order.quantity, 
            product_id = order.product_id, 
        )
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