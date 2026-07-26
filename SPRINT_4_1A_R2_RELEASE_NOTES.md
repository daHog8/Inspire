# INSPIRE — Sprint 4.1A R2

## Restauré
- 41 photos produit du catalogue.
- Visuel principal du catalogue et références de formats.
- Fiches produit complètes.
- Références produit et types de produit.
- Stocks séparés France / Gabon.
- Réservation Redis.
- Migration Alembic `20260720_03_catalogue_v1`.
- Seed catalogue complet.

## Amélioré
- Photos réintégrées dans les cartes premium R1.
- Zoom et ombre au survol.
- Fiche produit Luxury responsive.
- Pyramide olfactive.
- Intensité, tenue, projection, saisons et occasions.
- Histoire du parfum et conseils d’application.
- Affichage premium de la disponibilité France/Gabon.

## Mise à niveau de la base
Cette release ajoute une migration. Après remplacement du projet, exécuter :

```bash
docker compose down
docker compose up --build
```

Si les anciens produits de démonstration restent affichés, relancer le seed dans le conteneur API :

```bash
docker compose exec api python -m app.seed
```
