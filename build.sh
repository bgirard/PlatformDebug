#!/bin/bash
if [ ! -d "sdk" ]; then
  echo "Must download the sdk first. See the INSTALLING for more info"
  exit
fi

cd sdk
. ./bin/activate
cd ..
cfx xpi --update-link http://people.mozilla.org/~bgirard/PlatformDebug/platformdebug.xpi --update-url http://people.mozilla.org/~bgirard/PlatformDebug/platformdebug.update.rdf
