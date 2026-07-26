# Sprint 3 — Panier e-commerce

## Livré

- Panier global React avec Context API
- Persistance locale via `localStorage`
- Ajout depuis la fiche produit
- Compteur du panier
- Modification des quantités
- Suppression d’un article
- Vidage du panier
- Calcul du sous-total, livraison et total
- Livraison offerte à partir de 120 €
- Page `/cart`
- Endpoint `POST /api/v1/cart/validate`
- Vérification serveur des prix et du stock
- Tests API du panier

## Validation

```cmd
docker compose down
docker compose up --build
docker compose exec api python -m pytest
docker compose exec web npm run build
```

Parcours :

1. Ouvrir `/catalogue`
2. Choisir un parfum
3. Ajouter au panier
4. Ouvrir `/cart`
5. Modifier la quantité
6. Recharger la page et vérifier la persistance
