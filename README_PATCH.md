# Installation
Copiez ces fichiers à la racine du dépôt INSPIRE en remplaçant les fichiers existants.

```cmd
cd apps\web
npm install
cd ..\..
docker compose down
docker compose up --build
```

Tests :
```cmd
docker compose exec api pytest
docker compose exec web npm run build
```

Commit :
```cmd
git add .
git commit -m "feat: deliver Sprint 1 premium storefront"
git push
```
