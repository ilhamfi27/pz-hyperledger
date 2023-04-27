SHELL = /bin/bash
channel = mychannel
cli_delay = 3
max_retry = 5
verbose = true

export FABRIC_CFG_PATH=${PWD}/configtx
export CONTAINER_CLI=docker

orderer-start:
	docker compose -f docker/docker-compose.yml up -d orderer.zillabc.io

orderer-down:
	docker compose -f docker/docker-compose.yml stop orderer.zillabc.io
	docker compose -f docker/docker-compose.yml rm -f orderer.zillabc.io
	docker compose -f docker/docker-compose.yml stop ca_orderer
	docker compose -f docker/docker-compose.yml rm -f ca_orderer
	docker compose -f docker/docker-compose.yml up cert-remover
	docker compose -f docker/docker-compose.yml down

orderer-generate-org:
	docker compose -f docker/docker-compose.yml up -d ca_orderer
	sleep 3
	. organizations/fabric-ca/registerEnroll.sh

orderer-up:
	make orderer-generate-org
	sleep 3
	make orderer-start

channel-create:
	. scripts/prepareChannel.sh
	. scripts/createChannel.sh $(channel) $(cli_delay) $(max_retry) $(verbose)

service-stop: orderer-down
service-start: orderer-up
