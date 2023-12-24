#!/bin/sh

dir=$(realpath $(dirname $0)/..)
cd $dir
yarn="$dir/node_modules/yarn/bin/yarn"

rm -rf */dist/
rm -rf */node_modules/

$yarn cache clean declare-common
$yarn cache clean declare-db
$yarn cache clean declare-executor
$yarn cache clean declare-server
$yarn cache clean declare-web-ui