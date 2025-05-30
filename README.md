# Expensify Backend

Expensify est une API backend pour gérer les dépenses personnelles avec des notifications en temps réel. Développée avec Node.js, Express, MongoDB, et Socket.IO, elle permet aux utilisateurs de créer des comptes, gérer des catégories et dépenses, visualiser des statistiques, et recevoir des alertes (ex. : dépassement de budget à 10 000 FCFA par catégorie/mois).

## Fonctionnalités
- **Authentification** : Inscription, connexion, gestion de profil (JWT).
- **Catégories** : Création, mise à jour, suppression (soft delete).
- **Dépenses** : Ajout, recherche, filtrage, blocage (soft delete).
- **Statistiques** : Graphiques mensuels, par catégorie, totaux cumulés, évolution (%).
- **Notifications** : Alertes en temps réel via WebSocket pour actions (ex. : nouvelle dépense) et dépassements de budget.
- **Documentation** : API REST (`swagger.yaml`).

## Prérequis
- **Node.js** : v16 ou supérieur.
- **MongoDB** : Local ou Atlas.
- **Postman** : Pour tester l’API REST et WebSocket.
- **Navigateur** : Pour accéder à Swagger UI.

## Installation
1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/Bruno-ADH/expensifyBack.git
   cd expensifyBack


