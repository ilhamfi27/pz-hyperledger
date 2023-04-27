SHELL=/bin/bash

orderer-start:
	docker compose -f docker/docker-compose.yml up -d orderer.example.com

orderer-down:
	docker compose -f docker/docker-compose.yml stop orderer.example.com
	docker compose -f docker/docker-compose.yml rm -f orderer.example.com
	docker compose -f docker/docker-compose.yml stop ca_orderer
	docker compose -f docker/docker-compose.yml rm -f ca_orderer
	docker compose -f docker/docker-compose.yml up cert-remover
	docker compose -f docker/docker-compose.yml down

orderer-generate-org:
	docker compose -f docker/docker-compose.yml up -d ca_orderer
	sleep 5
	. organizations/fabric-ca/registerEnroll.sh

orderer-up:
	make orderer-generate-org
	sleep 5
	make orderer-start