# Plateforme de Restauration en Ligne

## Introduction

Ce projet est une initiative ambitieuse visant à révolutionner le secteur de la restauration en ligne. La plateforme a pour objectif de rassembler et de traiter les offres commerciales du domaine de la restauration afin de fournir une expérience personnalisée à plusieurs profils d'utilisateurs :
- Clients finaux (commande et suivi des livraisons)
- Restaurateurs (gestion de menus et statistiques)
- Livreurs (gestion et suivi des courses)
- Développeurs tiers (intégration d'API et composants réutilisables)
- Service commercial et technique (supervision, reporting, déploiement)

## Description du Projet

La solution repose sur une architecture hybride combinant les principes du SOA/ESB et des microservices. Les communications entre services se font de manière sécurisée et asynchrone, avec une conteneurisation via Docker et une orchestration possible avec Kubernetes pour la scalabilité.

## Structure du Monorepo

La structure du dépôt est organisée de la manière suivante :

- **apps/**
    - **web/** : Interface web (Next.js/Remix, React) pour les clients, restaurateurs et livreurs (PWA).
    - **mobile/** : Application mobile (Capacitor.js/Ionic, React Native) pour la gestion mobile et le suivi des livraisons.
    - **admin-dashboard/** : Interface d'administration (Next.js/React, Metabase en option) pour le suivi des performances, statistiques et gestion des comptes.

- **services/**
    - **api-gateway/** : Point d'entrée unique, gestion de l'authentification, du routage et de la documentation (NestJS/Express.js, OpenAPI).
    - **auth-service/** : Service d'authentification et gestion des tokens (Keycloak/Auth0, JWT).
    - **orders-service/** : Gestion des commandes (création, modification, paiement, suivi, historique).
    - **users-service/** : Gestion des comptes et rôles des différents utilisateurs (clients, restaurateurs, livreurs, etc.).
    - **restaurants-service/** : Gestion des menus, articles et promotions pour les restaurateurs.
    - **delivery-service/** : Gestion des livreurs et suivi des livraisons.
    - **notifications-service/** : Envoi de notifications push et pop-up (FCM, Web Push API).
    - **websockets-service/** : Communication temps réel via WebSocket (Socket.io, Redis PubSub).
    - **worker-service/** : Exécution des tâches asynchrones en arrière-plan (BullMQ, Redis ou RabbitMQ).
    - **elasticsearch/** (Optionnel) : Moteur de recherche full-text pour indexer et rechercher les restaurants, plats et menus.
    - **analytics-service/** (Optionnel) : Dashboard analytique pour le suivi des commandes et statistiques commerciales (Metabase, Superset).

- **infra/**
    - **database/**
        - **postgresql/** : Base de données SQL pour les transactions complexes et le reporting.
        - **mongodb/** : Base de données NoSQL pour le stockage des données métiers (comptes, commandes, etc.).
    - **message-broker/** : Système de messagerie asynchrone (RabbitMQ ou Redis Streams).
    - **proxy-loadbalancer/** : Reverse proxy et load balancing (Traefik ou Nginx).
    - **monitoring/** : Supervision et collecte des métriques (Prometheus, Grafana).
    - **storage/** : Stockage des images, documents et autres assets (MinIO ou AWS S3).
    - **minio/** (Optionnel) : Conteneur dédié pour un stockage S3 self-hosted (MinIO).

- **deployment/**
    - **k8s/** : Fichiers de configuration Kubernetes et Helm Charts pour le déploiement en production (optionnel).
    - **docker-compose.yml** : Déploiement local rapide avec Docker Compose.
    - **ci-cd/** : Pipelines d'intégration continue et de déploiement (GitHub Actions, GitLab CI, etc.).

- **shared/**
    - **common/** : Utilitaires et fonctions partagées entre les services.
    - **models/** : Schémas et modèles de données communs (TypeScript, JSON Schema).
    - **configs/** : Fichiers de configuration globaux.

## Technologies Utilisées

- **Front-end** : Next.js, React, Remix, Capacitor.js, Ionic, React Native
- **Back-end** : Node.js, NestJS, Express.js
- **Authentification** : Keycloak, Auth0, JWT
- **Bases de données** : MongoDB, PostgreSQL
- **Messagerie asynchrone** : RabbitMQ, Redis Streams
- **Conteneurisation** : Docker, Docker Compose
- **Orchestration** : Kubernetes (optionnel)
- **Monitoring** : Prometheus, Grafana
- **Stockage** : MinIO, AWS S3
- **Optionnels** : Elasticsearch pour la recherche et Analytics Service pour le dashboard commercial