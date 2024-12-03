from fastapi import APIRouter,  HTTPException
from fastapi import Depends
from infra.config.database import get_db
from schemas import schemas
from infra.repositories.products import ProductRepo
from infra.models import models
from sqlalchemy.orm import Session
from infra.providers.token_provider import get_current_user


router = APIRouter()

@router.post('/products', status_code=201)
def create_product(product:schemas.Product, current_user: schemas.User = Depends(get_current_user), db:Session = Depends(get_db)):
    created_product = ProductRepo(db).create(product)
    return created_product

@router.get('/products', response_model=list[schemas.Product])
def list_products(db:Session = Depends(get_db)):
    return ProductRepo(db).read()

@router.get('/products/{id_product}', response_model=schemas.Product)
def list_by_id(id_product:int, db:Session = Depends(get_db)):
    product = ProductRepo(db).read_by_id(id_product=id_product)
    if not product:
        raise HTTPException(status_code=404, detail=f"product com o id {id_product} não existe")
    return product

@router.put('/products/{id_product}', response_model=schemas.Product)
def update_product(id_product:int, new_data:dict, current_user: schemas.User = Depends(get_current_user), db:Session = Depends(get_db)):
    return ProductRepo(db).update(id_product=id_product, new_data=new_data)

@router.delete('/products/{id_product}')
def delete_product(id_product:int, db:Session = Depends(get_db)):
    return ProductRepo(db).delete(id_product=id_product)

#current_user: schemas.User = Depends(get_current_user),