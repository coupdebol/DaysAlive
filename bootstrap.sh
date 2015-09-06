#!/usr/bin/env bash

echo "--- PREPARING MACHINE FOR DAYSALIVE ---"


echo "-----------------------"
echo "--Installing Heroku toolbelt--"
echo "-----------------------"
wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh

echo "-----------------------"
echo "--- Installing Ansible ---"
echo "-----------------------"
sudo apt-add-repository ppa:ansible/ansible
sudo apt-get update
sudo apt-get install ansible --yes

cd DaysAlive

npm install --no-bin-links
