#! /bin/bash

cd "$(dirname $0)"

yarn cache clean declare-db
yarn cache clean declare-executor

cd ../db
yarn

cd ../executor
rm -rf node_modules
yarn

cd ../server
rm -rf node_modules
yarn
