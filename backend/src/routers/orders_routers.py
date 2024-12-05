from fastapi import APIRouter,  HTTPException
from fastapi import Depends
from infra.config.database import get_db
from schemas import schemas
from infra.repositories.orders import OrderRepo
from infra.models import models
from sqlalchemy.orm import Session
from infra.providers.token_provider import get_current_user

router = APIRouter()

@router.post('/orders/', status_code=201)
def create_order(orders:schemas.Order, current_user: schemas.User = Depends(get_current_user), db:Session = Depends(get_db)):
    created_order = OrderRepo(db).create(orders)
    return created_order

@router.get('/orders/', response_model=list[schemas.OrderPublic])
def list_orders(db:Session = Depends(get_db)):
    return OrderRepo(db).read()

@router.get('/orders/{id_order}', response_model=schemas.OrderPublic)
def list_by_id(id_order:int, db:Session = Depends(get_db)):
    orders = OrderRepo(db).read_by_id(id_order=id_order)
    if not orders:
        raise HTTPException(status_code=404, detail=f"pedido com o id {id_order} não existe")
    return orders

@router.put('/orders/{id_order}', response_model=schemas.Order)
def update_orders(id_order:int, new_data:dict, current_user: schemas.User = Depends(get_current_user), db:Session = Depends(get_db)):
    return OrderRepo(db).update(id_order=id_order, new_data=new_data)
