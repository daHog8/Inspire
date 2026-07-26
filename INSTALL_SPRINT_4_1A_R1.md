# Installation — Sprint 4.1A Release 1

Cette archive est un projet complet. Elle peut être installée dans un nouveau dossier sans fusion manuelle.

## Installation recommandée
1. Arrêter l'ancien projet : `docker compose down`.
2. Renommer l'ancien dossier `inspire` en `inspire_backup`.
3. Extraire l'archive. Elle crée un nouveau dossier `inspire`.
4. Vérifier que le fichier `.env` est présent.
5. Depuis le nouveau dossier `inspire`, lancer :
   - `docker compose down`
   - `docker compose up --build`
6. Ouvrir `http://localhost:3000`.

## Conservation des données
Ne pas utiliser `docker compose down -v` si vous souhaitez conserver la base PostgreSQL existante.

## Retour arrière
Arrêter la nouvelle version, supprimer ou renommer le nouveau dossier, puis remettre `inspire_backup` sous le nom `inspire`.
