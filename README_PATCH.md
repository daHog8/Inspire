# Installation Sprint 4

Copiez le contenu de ce patch à la racine du dépôt INSPIRE.

Puis :

```cmd
docker compose down
docker compose up --build
```

Ajoutez sur la fiche produit :

```tsx
<AvailabilityBadge slug={product.slug} />
<ReserveButton productId={product.id} />
```

Importez les composants :

```tsx
import { AvailabilityBadge } from "../../../components/availability-badge";
import { ReserveButton } from "../../../components/reserve-button";
```

Vérifiez :

```text
GET  http://localhost:8000/api/v1/products/eclat-solaire/availability
POST http://localhost:8000/api/v1/reservations
```

Commit :

```cmd
git add .
git commit -m "feat: deliver Sprint 4 France Gabon availability engine"
git push
```
