#!/usr/bin/env bash

echo "--- PREPARING MACHINE FOR DAYSALIVE ---"


echo "-----------------------"
echo "--Installing Heroku toolbelt--"
echo "-----------------------"
wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh


echo "--- PREPARING DEPENDENCIES FOR DAYSALIVE ---"


cd DaysAlive

npm install --no-bin-links
