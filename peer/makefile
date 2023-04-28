SHELL = /bin/bash
channel = mychannel
cli_delay = 3
max_retry = 5
verbose = true

export FABRIC_CFG_PATH=${PWD}/configtx
export CONTAINER_CLI=docker

orderer-generate-org:
	docker compose -f docker/docker-compose.yml up -d ca_orderer
	sleep 3
	. organizations/fabric-ca/registerEnroll.sh