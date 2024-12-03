from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import products_routers
from infra.config.database import create_db
from routers import users_routers, products_routers, orders_routers
from dotenv import load_dotenv
load_dotenv()

create_db()

app = FastAPI()

#CORS

origins = [
    "http://localhost:8080",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://localhost:5000"

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#ROTA DE USUARIOS
app.include_router(users_routers.router)

#ROTA DE PRODUTOS
app.include_router(products_routers.router)

#ROTA DE PEDIDOS
app.include_router(orders_routers.router)