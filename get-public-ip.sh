#!/bin/bash

PUBLIC_IP=$(curl -s https://ipinfo.io/ip)
echo "Detected public IP: ${PUBLIC_IP}"
