function createChannel() {
  # Bring up the network if it is not already up.
  bringUpNetwork="false"
  
  if [[ ! -d "organizations/peerOrganizations" ]]; then
    echo "Bringing network down to sync certs with containers"
    make orderer-down
  fi

  [[ ! -d "organizations/peerOrganizations" ]] && bringUpNetwork="true" || echo "Network Running Already"

  if [ $bringUpNetwork == "true"  ]; then
    echo "Bringing up network"
    make orderer-up
  fi
}

createChannel
