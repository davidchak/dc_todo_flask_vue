"""empty message

Revision ID: 58b032d71ebe
Revises: 24656b3f3cc5
Create Date: 2019-06-04 12:08:20.897289

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '58b032d71ebe'
down_revision = '24656b3f3cc5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('todo', sa.Column('complete', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('todo', 'complete')
    # ### end Alembic commands ###
