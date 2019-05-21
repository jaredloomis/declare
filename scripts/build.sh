#! /bin/bash

START_DIR="$(pwd)"
cd $(dirname $0)/..

yarn
cd common
yarn
cd ../db
yarn
cd ../executor
yarn
cd ../server
yarn
cd ../client
yarn

cd $START_DIR
