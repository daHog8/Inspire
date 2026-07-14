from alembic import op
import sqlalchemy as sa
revision="20260714_01"
down_revision=None
branch_labels=None
depends_on=None
def upgrade():
    op.create_table("brands",sa.Column("id",sa.Integer(),primary_key=True),sa.Column("name",sa.String(120),nullable=False,unique=True),sa.Column("slug",sa.String(140),nullable=False,unique=True),sa.Column("description",sa.Text(),nullable=True))
    op.create_table("categories",sa.Column("id",sa.Integer(),primary_key=True),sa.Column("name",sa.String(120),nullable=False,unique=True),sa.Column("slug",sa.String(140),nullable=False,unique=True))
    op.create_table("products",sa.Column("id",sa.Integer(),primary_key=True),sa.Column("name",sa.String(180),nullable=False),sa.Column("slug",sa.String(200),nullable=False,unique=True),sa.Column("description",sa.Text(),nullable=False),sa.Column("collection",sa.String(30),nullable=False),sa.Column("family",sa.String(120),nullable=False),sa.Column("price",sa.Float(),nullable=False),sa.Column("volume_ml",sa.Integer(),nullable=False),sa.Column("top_notes",sa.JSON(),nullable=False),sa.Column("heart_notes",sa.JSON(),nullable=False),sa.Column("base_notes",sa.JSON(),nullable=False),sa.Column("is_active",sa.Boolean(),nullable=False,server_default=sa.true()),sa.Column("brand_id",sa.Integer(),sa.ForeignKey("brands.id"),nullable=False),sa.Column("category_id",sa.Integer(),sa.ForeignKey("categories.id"),nullable=False))
    op.create_index("ix_products_slug","products",["slug"],unique=True)
    op.create_table("product_images",sa.Column("id",sa.Integer(),primary_key=True),sa.Column("url",sa.String(500),nullable=False),sa.Column("alt_text",sa.String(255),nullable=False),sa.Column("position",sa.Integer(),nullable=False,server_default="0"),sa.Column("product_id",sa.Integer(),sa.ForeignKey("products.id",ondelete="CASCADE"),nullable=False))
    op.create_table("inventory",sa.Column("id",sa.Integer(),primary_key=True),sa.Column("quantity",sa.Integer(),nullable=False,server_default="0"),sa.Column("low_stock_threshold",sa.Integer(),nullable=False,server_default="5"),sa.Column("product_id",sa.Integer(),sa.ForeignKey("products.id",ondelete="CASCADE"),nullable=False,unique=True))
def downgrade():
    op.drop_table("inventory");op.drop_table("product_images");op.drop_index("ix_products_slug",table_name="products");op.drop_table("products");op.drop_table("categories");op.drop_table("brands")
