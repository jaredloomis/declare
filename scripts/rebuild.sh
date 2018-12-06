#! /bin/bash

#npm i yarn -g

yarn cache clean declare-common
yarn cache clean declare-db
yarn cache clean declare-executor
yarn cache clean declare-server
yarn cache clean declare-web-ui

cd common
rm -rf node_modules
yarn
cd ../db
rm -rf node_modules
yarn
cd ../executor
rm -rf node_modules
yarn
cd ../server
rm -rf node_modules
yarn
cd ../client
rm -rf node_modules
yarn
