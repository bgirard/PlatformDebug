#!/bin/bash
ssh bgirard@people.mozilla.org "cd public_html/PlatformDebug && echo Pull \$PWD && git pull && chmod 755 platformdebug.*"
