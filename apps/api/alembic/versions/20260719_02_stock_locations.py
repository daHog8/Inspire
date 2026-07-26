"""add France and Gabon stock locations"""

from alembic import op
import sqlalchemy as sa

revision = "20260719_02"
down_revision = "20260714_01"
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.create_table(
        "stock_locations",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("code", sa.String(20), nullable=False, unique=True),
        sa.Column("name", sa.String(80), nullable=False),
        sa.Column("country", sa.String(80), nullable=False),
        sa.Column("transit_days_min", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("transit_days_max", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("priority", sa.Integer(), nullable=False, server_default="100"),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
    )
    op.create_table(
        "inventory_levels",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("available_quantity", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("reserved_quantity", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("product_id", sa.Integer(), sa.ForeignKey("products.id", ondelete="CASCADE"), nullable=False),
        sa.Column("location_id", sa.Integer(), sa.ForeignKey("stock_locations.id", ondelete="CASCADE"), nullable=False),
        sa.UniqueConstraint("product_id", "location_id", name="uq_inventory_product_location"),
    )

def downgrade() -> None:
    op.drop_table("inventory_levels")
    op.drop_table("stock_locations")
