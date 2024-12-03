from fastapi.testclient import TestClient
from src.main import app
from src.schemas.schemas import User, Product
from src.infra.models.models import User, Product, Order, OrderProduct
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.infra.config.database import Base

# Configuração do banco de dados de teste (em memória)
@pytest.fixture(scope="module")
def test_db():
    # Cria um banco de dados em memória para testes
    engine = create_engine("sqlite:///:memory:", echo=True)

    # Cria as tabelas no banco de dados
    Base.metadata.create_all(bind=engine)

    # Cria uma sessão
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    session = SessionLocal()

    yield session

    # Limpa as tabelas após os testes
    session.close()
    Base.metadata.drop_all(bind=engine)


client = TestClient(app)

def test_create_order():
    payload = {
        "client_name": "João Silva",
        "client_phone": "11999999999",
        "payment_method": "credit_card",
        "payment_status": "paid",
        "total": 150.50,
        "datetime": "2024-11-24T01:10:22.652Z",
        "product": [
            {
                "name": "Camiseta Azul",
                "category": "Roupas",
                "stock": 50,
                "price": 75.25,
                "picture": "camiseta_azul.jpg"
            },
            {
                "name": "Camiseta Vermelha",
                "category": "Roupas",
                "stock": 30,
                "price": 75.25,
                "picture": "camiseta_vermelha.jpg"
            }
        ],
        "quantity": 2
    }

    response = client.post("/orders/", json=payload)
    assert response.status_code == 201
    assert response.json()["client_name"] == "João Silva"
    assert response.json()["total"] == 150.50

# def test_create_user():
#     user_data = {
#         "name": "Mariah",
#         "email": "mariah@example.com",
#         "password": "1234", 
#         "role": "manager",
#         "is_active": True,
#     }

#     response = client.post("/users/", json=user_data)
#     assert response.status_code == 200

# def test_read_user():
#     response = client.get("/users/")
#     assert response.status_code == 200

# def test_read_user_by_id():
#     user_id = 1
#     response = client.get(f"/users/{user_id}")
#     assert response.status_code == 200


# def test_update_user():
#     user_id = 1
#     new_user = {
#         "name": "Mariah",
#         "email": "mariah@example.com",
#         "password": "1234", 
#         "role": "manager",
#         "is_active": False,
#     }

#     response = client.put(f"/users/{user_id}", json=new_user)
#     assert response.status_code == 200

# def test_create_user(test_db):
#     # Cria um novo usuário
#     user = User(name="John Doe", email="john@example.com", password="password", role="admin", is_active=True)

#     # Adiciona e comita o usuário no banco de dados
#     test_db.add(user)
#     test_db.commit()

#     # Recupera o usuário do banco de dados
#     db_user = test_db.query(User).filter_by(email="john@example.com").first()

#     # Verifica se o usuário foi corretamente criado
#     assert db_user is not None
#     assert db_user.name == "John Doe"
#     assert db_user.email == "john@example.com"


# def test_create_product(test_db):
#     # Cria um novo produto
#     product = Product(name="Produto A", category="Categoria 1", stock=10, price=100.0, picture="produto_a.jpg")

#     # Adiciona e comita o produto no banco de dados
#     test_db.add(product)
#     test_db.commit()

#     # Recupera o produto do banco de dados
#     db_product = test_db.query(Product).filter_by(name="Produto A").first()

#     # Verifica se o produto foi corretamente criado
#     assert db_product is not None
#     assert db_product.name == "Produto A"
#     assert db_product.category == "Categoria 1"


# def test_create_order_and_association(test_db):
#     # Cria um usuário e um produto
#     user = User(name="Jane Doe", email="jane@example.com", password="password", role="customer", is_active=True)
#     product = Product(name="Produto B", category="Categoria 2", stock=20, price=200.0, picture="produto_b.jpg")

#     # Cria um pedido
#     order = Order(client_name="Jane Doe", client_phone="123456789", payment_method="credit_card", payment_status=1.0, total="200.0")

#     # Cria a associação entre pedido e produto
#     order_product = OrderProduct(order=order, product=product, quantity=2)

#     # Adiciona os dados ao banco de dados
#     test_db.add(user)
#     test_db.add(product)
#     test_db.add(order)
#     test_db.add(order_product)
#     test_db.commit()

#     # Recupera o pedido e verifica a associação
#     db_order = test_db.query(Order).filter_by(client_name="Jane Doe").first()
#     db_order_product = test_db.query(OrderProduct).filter_by(order_id=db_order.id).first()

#     # Verifica a associação entre pedido e produto
#     assert db_order_product is not None
#     assert db_order_product.quantity == 2
#     assert db_order_product.product.name == "Produto B"
