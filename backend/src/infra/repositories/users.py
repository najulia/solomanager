from sqlalchemy.orm import Session, session
from schemas import schemas
from infra.models import models
from sqlalchemy import update

class UserRepo():

    def __init__(self, db:Session):
        self.db = db

    def create(self, user:schemas.User):
        db_user = models.User(
            name = user.name,
            email = user.email, 
            password = user.password, 
            role = user.role, 
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user

    def read(self):
        return self.db.query(models.User).all()

    def read_by_id(self, id_user:int):
        return self.db.query(models.User).filter(models.User.id==id_user).first()

    def update(self, id_user:int, new_data:dict):
        new_user = self.db.query(models.User).filter(models.User.id == id_user).first()
        for key, value in new_data.items():
            setattr(new_user, key, value)
        self.db.commit()
        return new_user

    def get_by_email(self, email):
        return self.db.query(models.User).filter(models.User.email == email).first()
    
    def get_user_products(self, id_user: int):
        return self.db.query(models.Product).filter(models.Product.user_id == id_user).all()
    
    def get_user_orders(self, id_user: int):
        return self.db.query(models.Order).filter(models.Order.user_id == id_user).all()