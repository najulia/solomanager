"""alterando relacionamento pedido x usuario

Revision ID: 558f4a31eb5f
Revises: 
Create Date: 2024-12-05 20:28:41.707653

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '558f4a31eb5f'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
