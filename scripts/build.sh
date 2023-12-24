#! /bin/bash

dir=$(realpath $(dirname $0)/..)
cd $dir
yarn="$dir/node_modules/yarn/bin/yarn"

#if ! [ -x "$(command -v nvm)" ]; then
#  source /usr/share/nvm/init-nvm.sh
#fi

. $dir/scripts/clean.sh

#nvm use 10

npm i
cd common
$yarn
cd ../db
$yarn
cd ../executor
$yarn
cd ../server
$yarn
#cd ../client
#$yarn

#nvm use 18
cd ../new-client
$yarn
$yarn build
