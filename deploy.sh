#!/bin/bash

cd hugo
hugo build
cd ..

rsync -av --delete-after ./ rivescript@git.kirsle.net:git/rivescript.com/