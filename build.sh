#!/bin/bash
if [ ! -d "sdk" ]; then
  echo "Must download the sdk first. See the INSTALLING for more info"
  exit
fi

cd sdk
. ./bin/activate
cd ..
cfx xpi --update-link https://github.com/bgirard/PlatformDebug/raw/master/PlatformDebug.xpi --update-url https://github.com/bgirard/PlatformDebug/raw/master/PlatformDebug.update.rdf
