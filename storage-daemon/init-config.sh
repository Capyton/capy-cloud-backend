#!/bin/bash
set -e

mkdir -p storage-daemon/private

if [ "$#" -ne 1 ]; then
    echo "Exact 1 argument required: config path or mainnet/testnet"
    exit 1
fi

if [ "$1" == "testnet" ]; then
    wget -q -O storage-daemon/private/testnet.json https://ton.org/testnet-global.config.json
    echo "Downloading testnet global config file"
elif [ "$1" == "mainnet" ]; then
    wget -q -O storage-daemon/private/mainnet.json https://ton.org/global.config.json
    echo "Downloading mainnet global config file"
fi
