#!/bin/bash

outf=dataset.js

echo "var dataset = {};" > $outf
for i in `ls -d js/*`
do
    echo $i
    echo >> $outf
    cat $i >> $outf
done
