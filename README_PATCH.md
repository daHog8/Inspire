# Patch filtre Catalogue depuis la landing page

Ce patch permet aux liens suivants de filtrer réellement le catalogue :

- `/catalogue?collection=Femme`
- `/catalogue?collection=Homme`
- `/catalogue?collection=Mixte`

## Installation

Copiez le contenu du dossier à la racine du dépôt INSPIRE en acceptant le remplacement du fichier existant.

Puis :

```cmd
docker compose down
docker compose up --build
```

## Vérifications

Depuis la landing page :

- **Pour elle** → uniquement les produits `Femme`
- **Pour lui** → uniquement les produits `Homme`
- **À partager** → uniquement les produits `Mixte`

Test direct :

```text
http://localhost:3000/catalogue?collection=Femme
http://localhost:3000/catalogue?collection=Homme
http://localhost:3000/catalogue?collection=Mixte
```

Commit :

```cmd
git add .
git commit -m "fix: apply landing collection filters to catalogue"
git push
```
