FROM grafana/grafana:latest

# A ajouter si on configure des dashboards
COPY provisioning/ /etc/grafana/provisioning/
ADD provisioning/dashboards/ /var/lib/grafana/dashboards/