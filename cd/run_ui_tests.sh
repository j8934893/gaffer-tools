#!/bin/bash

set -e

xvfb-run --auto-servernum mvn clean install -pl :ui

#xvfb_pids=`ps aux | grep tmp/xvfb-run | grep -v grep | awk '{print $2}'`
#if [ "$xvfb_pids" != "" ]; then
#  echo "Killing the following xvfb processes: $xvfb_pids"
#  sudo kill -9 $xvfb_pids
#else
#  echo "No xvfb processes to kill"
#fi
