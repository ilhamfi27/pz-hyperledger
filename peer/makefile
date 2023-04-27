SHELL=/bin/bash

orderer-start:
	docker compose up -d orderer.example.com

orderer-down:
	docker compose stop orderer.example.com
	docker compose rm -f orderer.example.com

orderer-generate-org:
	bin/cryptogen generate --config=./organizations/cryptogen/crypto-config-orderer.yaml --output="organizations"

orderer-up:
	make orderer-generate-org
	make orderer-start
