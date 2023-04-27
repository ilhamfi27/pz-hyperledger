$CONTAINER
function createChannel() {
  # Bring up the network if it is not already up.
  bringUpNetwork="false"

  if ! $CONTAINER_CLI info > /dev/null 2>&1 ; then
    fatalln "$CONTAINER_CLI network is required to be running to create a channel"
  fi

  # check if all containers are present
  len=$($CONTAINER_CLI ps | grep hyperledger/ | wc -l)

  [[ $len -lt 2 ]] && bringUpNetwork="true" || echo "Network Running Already"

  if [ $bringUpNetwork == "true"  ]; then
    echo "Bringing up network"
    make orderer-up
  fi
}

createChannel
