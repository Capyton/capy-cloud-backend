#!/bin/bash
set -e

if [ "$#" -ne 1 ]; then
    echo "Exact 1 argument required: config path or mainnet/testnet"
    exit 1
fi

if [ "$1" == "testnet" ]; then
    wget -q -O global_configs/testnet.json https://ton.org/testnet-global.config.json
    echo "Downloading testnet global config file"
elif [ "$1" == "mainnet" ]; then
    wget -q -O global_configs/mainnet.json https://ton.org/global.config.json
    echo "Downloading mainnet global config file"
fi
