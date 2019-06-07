"""empty message

Revision ID: 24656b3f3cc5
Revises:
Create Date: 2019-06-01 14:33:00.190136

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '24656b3f3cc5'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('todo',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('title', sa.String(length=100), nullable=False),
                    sa.Column('body', sa.String(length=500), nullable=True),
                    sa.Column('created', sa.DateTime(), nullable=True),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('todo')
    # ### end Alembic commands ###
