#! /bin/bash

#npm i yarn -g

yarn cache clean declare-common
yarn cache clean declare-db
yarn cache clean declare-executor
yarn cache clean declare-server
yarn cache clean declare-web-ui

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
