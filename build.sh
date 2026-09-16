#!/bin/bash
cd texture-wads
./compilewads.sh
cd ../qcompat/maps
if [ $# -eq 0 ]; then
  python3 compile_maps.py -m
else
  python3 compile_maps.py -s $1
fi

