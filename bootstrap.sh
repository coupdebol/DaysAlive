#!/usr/bin/env bash

echo "--- PREPARING MACHINE FOR DAYSALIVE ---"

echo "-----------------------"
echo "--- Installing curl ---"
echo "-----------------------"
sudo apt-get install --yes curl


echo "-----------------------"
echo "-- Addding Nodesource repository --"
echo "-----------------------"
curl -sL https://deb.nodesource.com/setup | sudo bash -

sudo apt-get install python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs


echo "-----------------------"
echo "--- Installing node.js ---"
echo "-----------------------"
sudo apt-get install --yes nodejs npm


echo "-----------------------"
echo "--- Installing build essential ---"
echo "-----------------------"
sudo apt-get install --yes build-essential


echo "-----------------------"
echo "--Installing Heroku toolbelt--"
echo "-----------------------"
wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh


echo "--- PREPARING DEPENDENCIES FOR DAYSALIVE ---"


cd DaysAlive

npm install --no-bin-links
