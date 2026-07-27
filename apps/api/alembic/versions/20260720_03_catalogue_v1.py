"""catalogue v1 metadata

Revision ID: 20260720_03
Revises: 20260719_02
"""

from alembic import op
import sqlalchemy as sa

revision = "20260720_03"
down_revision = "20260719_02"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "products",
        sa.Column("reference_code", sa.String(length=40), nullable=True),
    )
    op.add_column(
        "products",
        sa.Column(
            "product_type",
            sa.String(length=40),
            nullable=False,
            server_default="extrait",
        ),
    )
    op.create_unique_constraint(
        "uq_products_reference_code",
        "products",
        ["reference_code"],
    )


def downgrade() -> None:
    op.drop_constraint("uq_products_reference_code", "products", type_="unique")
    op.drop_column("products", "product_type")
    op.drop_column("products", "reference_code")
