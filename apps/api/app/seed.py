from sqlalchemy import delete, select

from app.db.session import SessionLocal
from app.models import (
    Brand,
    Category,
    Inventory,
    InventoryLevel,
    Product,
    ProductImage,
    StockLocation,
)

CATALOGUE = [{'reference_code': 'OLF-001', 'name': 'Éclat Solaire', 'slug': 'eclat-solaire', 'collection': 'Femme', 'family': 'Floral ambré', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Bergamote'], 'heart_notes': ['Jasmin'], 'base_notes': ['Vanille'], 'gabon_stock': 0, 'france_stock': 8}, {'reference_code': 'OLF-002', 'name': 'Nuit Magnétique', 'slug': 'nuit-magnetique', 'collection': 'Homme', 'family': 'Boisé épicé', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Poivre noir'], 'heart_notes': ['Cèdre'], 'base_notes': ['Ambre'], 'gabon_stock': 5, 'france_stock': 13}, {'reference_code': 'OLF-003', 'name': 'Oud Impérial', 'slug': 'oud-imperial', 'collection': 'Mixte', 'family': 'Oriental boisé', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Safran'], 'heart_notes': ['Oud'], 'base_notes': ['Patchouli'], 'gabon_stock': 8, 'france_stock': 18}, {'reference_code': 'OLF-004', 'name': 'Vanille Addict', 'slug': 'vanille-addict', 'collection': 'Femme', 'family': 'Gourmand', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Mandarine'], 'heart_notes': ['Vanille'], 'base_notes': ['Musc blanc'], 'gabon_stock': 2, 'france_stock': 23}, {'reference_code': 'OLF-005', 'name': 'Rose Éternelle', 'slug': 'rose-eternelle', 'collection': 'Femme', 'family': 'Floral', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Litchi'], 'heart_notes': ['Rose'], 'base_notes': ['Musc'], 'gabon_stock': 5, 'france_stock': 28}, {'reference_code': 'OLF-006', 'name': 'Musc Blanc', 'slug': 'musc-blanc', 'collection': 'Mixte', 'family': 'Musqué', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Aldéhydes'], 'heart_notes': ['Fleurs blanches'], 'base_notes': ['Musc blanc'], 'gabon_stock': 8, 'france_stock': 12}, {'reference_code': 'OLF-007', 'name': 'Ambre Fatale', 'slug': 'ambre-fatale', 'collection': 'Mixte', 'family': 'Ambré', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Épices'], 'heart_notes': ['Ambre'], 'base_notes': ['Benjoin'], 'gabon_stock': 2, 'france_stock': 17}, {'reference_code': 'OLF-010', 'name': 'Cuir Subtil', 'slug': 'cuir-subtil', 'collection': 'Homme', 'family': 'Cuiré', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Bergamote'], 'heart_notes': ['Cuir'], 'base_notes': ['Fève tonka'], 'gabon_stock': 0, 'france_stock': 22}, {'reference_code': 'OLF-011', 'name': 'Bois Sacré', 'slug': 'bois-sacre', 'collection': 'Homme', 'family': 'Boisé', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Cardamome'], 'heart_notes': ['Bois de santal'], 'base_notes': ['Vétiver'], 'gabon_stock': 8, 'france_stock': 27}, {'reference_code': 'OLF-013', 'name': 'Épice Noire', 'slug': 'epice-noire', 'collection': 'Homme', 'family': 'Épicé', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Poivre'], 'heart_notes': ['Cannelle'], 'base_notes': ['Bois fumés'], 'gabon_stock': 2, 'france_stock': 11}, {'reference_code': 'OLF-014', 'name': 'Jasmin Royal', 'slug': 'jasmin-royal', 'collection': 'Femme', 'family': 'Floral blanc', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Néroli'], 'heart_notes': ['Jasmin'], 'base_notes': ['Bois doux'], 'gabon_stock': 5, 'france_stock': 16}, {'reference_code': 'OLF-015', 'name': 'Citrus Divin', 'slug': 'citrus-divin', 'collection': 'Mixte', 'family': 'Hespéridé', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Citron'], 'heart_notes': ["Fleur d'oranger"], 'base_notes': ['Musc'], 'gabon_stock': 8, 'france_stock': 21}, {'reference_code': 'OLF-016', 'name': 'Fleur de Soie', 'slug': 'fleur-de-soie', 'collection': 'Femme', 'family': 'Floral musqué', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Poire'], 'heart_notes': ['Pivoine'], 'base_notes': ['Musc'], 'gabon_stock': 2, 'france_stock': 26}, {'reference_code': 'OLF-017', 'name': 'Lumière d’Orient', 'slug': 'lumiere-dorient', 'collection': 'Mixte', 'family': 'Oriental', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Bergamote'], 'heart_notes': ['Encens'], 'base_notes': ['Ambre'], 'gabon_stock': 5, 'france_stock': 10}, {'reference_code': 'OLF-018', 'name': 'Velours Noir', 'slug': 'velours-noir', 'collection': 'Femme', 'family': 'Floral sombre', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Cassis'], 'heart_notes': ['Rose noire'], 'base_notes': ['Patchouli'], 'gabon_stock': 0, 'france_stock': 15}, {'reference_code': 'OLF-019', 'name': 'Pétale de Rose', 'slug': 'petale-de-rose', 'collection': 'Femme', 'family': 'Floral', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Poire'], 'heart_notes': ['Rose'], 'base_notes': ['Musc'], 'gabon_stock': 2, 'france_stock': 20}, {'reference_code': 'OLF-020', 'name': 'Coco Divine', 'slug': 'coco-divine', 'collection': 'Femme', 'family': 'Gourmand', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Mandarine'], 'heart_notes': ['Noix de coco'], 'base_notes': ['Vanille'], 'gabon_stock': 5, 'france_stock': 25}, {'reference_code': 'OLF-021', 'name': 'Sable Chaud', 'slug': 'sable-chaud', 'collection': 'Mixte', 'family': 'Ambré solaire', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Bergamote'], 'heart_notes': ['Ylang-ylang'], 'base_notes': ['Ambre'], 'gabon_stock': 8, 'france_stock': 9}, {'reference_code': 'OLF-023', 'name': 'Iris Poudré', 'slug': 'iris-poudre', 'collection': 'Femme', 'family': 'Poudré', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Violette'], 'heart_notes': ['Iris'], 'base_notes': ['Musc'], 'gabon_stock': 2, 'france_stock': 14}, {'reference_code': 'OLF-024', 'name': 'Baies Rouges', 'slug': 'baies-rouges', 'collection': 'Femme', 'family': 'Fruité', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Framboise'], 'heart_notes': ['Fruits rouges'], 'base_notes': ['Vanille'], 'gabon_stock': 5, 'france_stock': 19}, {'reference_code': 'OLF-025', 'name': 'Mûre Sauvage', 'slug': 'mure-sauvage', 'collection': 'Femme', 'family': 'Fruité boisé', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Mûre'], 'heart_notes': ['Rose'], 'base_notes': ['Bois ambrés'], 'gabon_stock': 8, 'france_stock': 24}, {'reference_code': 'OLF-026', 'name': 'Pêche Veloutée', 'slug': 'peche-veloutee', 'collection': 'Femme', 'family': 'Fruité floral', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Pêche'], 'heart_notes': ['Jasmin'], 'base_notes': ['Musc'], 'gabon_stock': 0, 'france_stock': 8}, {'reference_code': 'OLF-027', 'name': 'Lychee Exquise', 'slug': 'lychee-exquise', 'collection': 'Femme', 'family': 'Fruité floral', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Litchi'], 'heart_notes': ['Pivoine'], 'base_notes': ['Vanille'], 'gabon_stock': 5, 'france_stock': 13}, {'reference_code': 'OLF-028', 'name': 'Cerise Gourmande', 'slug': 'cerise-gourmande', 'collection': 'Femme', 'family': 'Gourmand fruité', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Cerise'], 'heart_notes': ['Amande'], 'base_notes': ['Vanille'], 'gabon_stock': 8, 'france_stock': 18}, {'reference_code': 'OLF-029', 'name': 'Fraise Bonbon', 'slug': 'fraise-bonbon', 'collection': 'Femme', 'family': 'Gourmand fruité', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Fraise'], 'heart_notes': ['Caramel'], 'base_notes': ['Musc'], 'gabon_stock': 2, 'france_stock': 23}, {'reference_code': 'OLF-030', 'name': 'Thé Impérial', 'slug': 'the-imperial', 'collection': 'Mixte', 'family': 'Aromatique', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Bergamote'], 'heart_notes': ['Thé noir'], 'base_notes': ['Bois de cèdre'], 'gabon_stock': 5, 'france_stock': 28}, {'reference_code': 'OLF-032', 'name': 'Patchouli Nuit', 'slug': 'patchouli-nuit', 'collection': 'Mixte', 'family': 'Boisé oriental', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Poivre rose'], 'heart_notes': ['Patchouli'], 'base_notes': ['Ambre'], 'gabon_stock': 8, 'france_stock': 12}, {'reference_code': 'OLF-037', 'name': 'Encens Mystique', 'slug': 'encens-mystique', 'collection': 'Mixte', 'family': 'Fumé', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Élémi'], 'heart_notes': ['Encens'], 'base_notes': ['Bois fumés'], 'gabon_stock': 2, 'france_stock': 17}, {'reference_code': 'OLF-038', 'name': 'Tabac Doux', 'slug': 'tabac-doux', 'collection': 'Homme', 'family': 'Ambré tabacé', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Cannelle'], 'heart_notes': ['Tabac blond'], 'base_notes': ['Vanille'], 'gabon_stock': 0, 'france_stock': 22}, {'reference_code': 'OLF-039', 'name': 'Barbe à Papa', 'slug': 'barbe-a-papa', 'collection': 'Femme', 'family': 'Gourmand', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Fruits rouges'], 'heart_notes': ['Sucre filé'], 'base_notes': ['Vanille'], 'gabon_stock': 8, 'france_stock': 27}, {'reference_code': 'OLF-040', 'name': 'Caramel Fondant', 'slug': 'caramel-fondant', 'collection': 'Femme', 'family': 'Gourmand', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Orange'], 'heart_notes': ['Caramel'], 'base_notes': ['Fève tonka'], 'gabon_stock': 2, 'france_stock': 11}, {'reference_code': 'OLF-041', 'name': 'Chocolat Noir', 'slug': 'chocolat-noir', 'collection': 'Mixte', 'family': 'Gourmand boisé', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Orange amère'], 'heart_notes': ['Cacao'], 'base_notes': ['Bois précieux'], 'gabon_stock': 5, 'france_stock': 16}, {'reference_code': 'OLF-042', 'name': 'Vanille Bourbon', 'slug': 'vanille-bourbon', 'collection': 'Mixte', 'family': 'Gourmand', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Rhum'], 'heart_notes': ['Vanille bourbon'], 'base_notes': ['Benjoin'], 'gabon_stock': 8, 'france_stock': 21}, {'reference_code': 'OLF-043', 'name': 'Fleur de Cerisier', 'slug': 'fleur-de-cerisier', 'collection': 'Femme', 'family': 'Floral fruité', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Poire'], 'heart_notes': ['Fleur de cerisier'], 'base_notes': ['Musc'], 'gabon_stock': 2, 'france_stock': 26}, {'reference_code': 'OLF-044', 'name': 'Bambou Zen', 'slug': 'bambou-zen', 'collection': 'Mixte', 'family': 'Vert frais', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Citron vert'], 'heart_notes': ['Bambou'], 'base_notes': ['Musc'], 'gabon_stock': 5, 'france_stock': 10}, {'reference_code': 'OLF-045', 'name': 'Brise Marine', 'slug': 'brise-marine', 'collection': 'Mixte', 'family': 'Aquatique', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Agrumes'], 'heart_notes': ['Accord marin'], 'base_notes': ['Bois flotté'], 'gabon_stock': 0, 'france_stock': 15}, {'reference_code': 'OLF-046', 'name': 'Menthe Fraîche', 'slug': 'menthe-fraiche', 'collection': 'Mixte', 'family': 'Aromatique frais', 'product_type': 'travel-spray', 'category_slug': 'travel-sprays', 'category_name': 'Travel sprays 15 ml', 'volume_ml': 15, 'price': 24.9, 'top_notes': ['Citron'], 'heart_notes': ['Menthe'], 'base_notes': ['Musc'], 'gabon_stock': 2, 'france_stock': 20}, {'reference_code': 'OLF-SOL-15', 'name': 'Solaire Intense', 'slug': 'solaire-intense', 'collection': 'Mixte', 'family': 'Floral solaire', 'product_type': 'extrait', 'category_slug': 'extraits', 'category_name': 'Extraits de parfum', 'volume_ml': 15, 'price': 34.9, 'top_notes': ['Bergamote'], 'heart_notes': ['Ylang-ylang'], 'base_notes': ['Ambre'], 'gabon_stock': 5, 'france_stock': 25}, {'reference_code': 'OLF-ROS-30', 'name': 'Rose Poudrée', 'slug': 'rose-poudree', 'collection': 'Femme', 'family': 'Floral poudré', 'product_type': 'extrait', 'category_slug': 'extraits', 'category_name': 'Extraits de parfum', 'volume_ml': 30, 'price': 64.9, 'top_notes': ['Litchi'], 'heart_notes': ['Rose'], 'base_notes': ['Iris'], 'gabon_stock': 8, 'france_stock': 9}, {'reference_code': 'OLF-OUD-70', 'name': 'Oud Noir', 'slug': 'oud-noir', 'collection': 'Mixte', 'family': 'Oriental boisé', 'product_type': 'extrait', 'category_slug': 'extraits', 'category_name': 'Extraits de parfum', 'volume_ml': 70, 'price': 119.9, 'top_notes': ['Safran'], 'heart_notes': ['Oud'], 'base_notes': ['Cuir'], 'gabon_stock': 2, 'france_stock': 14}, {'reference_code': 'OLF-ORI-250', 'name': 'Oriental Suprême', 'slug': 'oriental-supreme', 'collection': 'Maison', 'family': 'Parfum d’intérieur', 'product_type': 'interieur', 'category_slug': 'maison', 'category_name': 'Parfums d’intérieur', 'volume_ml': 250, 'price': 49.9, 'top_notes': ['Épices'], 'heart_notes': ['Bois précieux'], 'base_notes': ['Ambre'], 'gabon_stock': 5, 'france_stock': 19}]

LEGACY_SLUGS = {
    "souffle-libre",
    "velours-royal",
    "bois-d-horizon",
    "neroli-celeste",
}


def run_seed() -> None:
    db = SessionLocal()
    try:
        brand = db.scalar(select(Brand).where(Brand.slug == "olfazeta"))
        if brand is None:
            brand = Brand(
                name="Olfazeta",
                slug="olfazeta",
                description="Maison italienne de parfums, distribuée par INSPIRE.",
            )
            db.add(brand)

        categories = {}
        for item in CATALOGUE:
            slug = item["category_slug"]
            if slug in categories:
                continue
            category = db.scalar(select(Category).where(Category.slug == slug))
            if category is None:
                category = Category(name=item["category_name"], slug=slug)
                db.add(category)
            categories[slug] = category

        gabon = db.scalar(select(StockLocation).where(StockLocation.code == "GABON"))
        if gabon is None:
            gabon = StockLocation(
                code="GABON",
                name="Stock Gabon",
                country="Gabon",
                transit_days_min=1,
                transit_days_max=2,
                priority=1,
                is_active=True,
            )
            db.add(gabon)

        france = db.scalar(select(StockLocation).where(StockLocation.code == "FRANCE"))
        if france is None:
            france = StockLocation(
                code="FRANCE",
                name="Stock France",
                country="France",
                transit_days_min=7,
                transit_days_max=12,
                priority=2,
                is_active=True,
            )
            db.add(france)

        db.flush()

        legacy_products = list(
            db.scalars(select(Product).where(Product.slug.in_(LEGACY_SLUGS))).all()
        )
        for product in legacy_products:
            db.delete(product)

        for item in CATALOGUE:
            product = db.scalar(
                select(Product).where(Product.reference_code == item["reference_code"])
            )
            if product is None:
                product = Product(reference_code=item["reference_code"])
                db.add(product)

            product.name = item["name"]
            product.slug = item["slug"]
            product.description = (
                f"{item['name']} est une création {item['family'].lower()} "
                "sélectionnée pour le catalogue INSPIRE. "
                "Une signature concentrée, pensée pour accompagner le quotidien."
            )
            product.collection = item["collection"]
            product.family = item["family"]
            product.product_type = item["product_type"]
            product.price = item["price"]
            product.volume_ml = item["volume_ml"]
            product.top_notes = item["top_notes"]
            product.heart_notes = item["heart_notes"]
            product.base_notes = item["base_notes"]
            product.brand = brand
            product.category = categories[item["category_slug"]]
            product.is_active = True
            db.flush()

            product.images.clear()
            product.images.append(
                ProductImage(
                    url=f"/products/{item['slug']}.jpg",
                    alt_text=f"{item['name']} — photo produit",
                    position=0,
                )
            )

            total_stock = item["gabon_stock"] + item["france_stock"]
            if product.inventory is None:
                product.inventory = Inventory(
                    quantity=total_stock,
                    low_stock_threshold=5,
                )
            else:
                product.inventory.quantity = total_stock

            for location, quantity in [
                (gabon, item["gabon_stock"]),
                (france, item["france_stock"]),
            ]:
                level = db.scalar(
                    select(InventoryLevel).where(
                        InventoryLevel.product_id == product.id,
                        InventoryLevel.location_id == location.id,
                    )
                )
                if level is None:
                    level = InventoryLevel(
                        product_id=product.id,
                        location_id=location.id,
                    )
                    db.add(level)
                level.available_quantity = quantity
                level.reserved_quantity = 0

        db.commit()
        print(f"Catalogue INSPIRE initialisé : {len(CATALOGUE)} références.")
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    run_seed()
