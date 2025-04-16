#!/bin/bash

echo "🧪 Running CyberArmor Red Team listener..."
pm2 start listener.js --name cyberarmor-listener
