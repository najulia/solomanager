"""alterando campo telefone do cliente em pedidos

Revision ID: ba3d2e4c6198
Revises: 260681321575
Create Date: 2024-12-05 19:10:00.555458

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = 'ba3d2e4c6198'
down_revision: Union[str, None] = '260681321575'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('customer_phone', table_name='orders')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('email', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('password', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('role', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('is_active', mysql.TINYINT(display_width=1), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_table('products',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('category', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('stock', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('price', mysql.FLOAT(), nullable=False),
    sa.Column('picture', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('user_id', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='products_ibfk_1'),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_index('ix_products_id', 'products', ['id'], unique=False)
    op.create_table('orders',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('customer_name', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('customer_phone', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('payment_method', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('payment_status', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('quantity', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('total', mysql.FLOAT(), nullable=True),
    sa.Column('product_id', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], name='orders_ibfk_1'),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_index('ix_orders_id', 'orders', ['id'], unique=False)
    op.create_index('customer_phone', 'orders', ['customer_phone'], unique=True)
    # ### end Alembic commands ###