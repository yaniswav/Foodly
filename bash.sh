docker compose -f "./services/compose.yml" up -d
docker compose -f "./infra/monitoring/compose.yml" up -d
docker compose -f "./apps/web/compose.yml" up -d

exit