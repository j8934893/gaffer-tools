#!/bin/bash

set -e

mvn install -P quick,travis,road-traffic-demo -B -pl ui &
export DISPLAY=:99.0
sh -e xvfb start
sudo apt-get -qq update
sudo apt-get install -y dbus
sudo bash -c "dbus-uuidgen > /etc/machine-id"
curl -OL https://github.com/mozilla/geckodriver/releases/download/v0.23.0/geckodriver-v0.23.0-linux64.tar.gz
tar -xf geckodriver-v0.23.0-linux64.tar.gz
mv geckodriver ui/
sleep 1m
mvn verify -P travis,system-test -Dwebdriver.gecko.driver=geckodriver -pl ui
cd python-shell && python3 -m unittest discover -s src
