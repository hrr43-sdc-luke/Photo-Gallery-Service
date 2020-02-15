#!/bin/bash
input="./topics.txt"
for i in `seq 1 25`;
do
  while IFS= read -r line
  do
    curl -L "source.unsplash.com/random/715x475/?$line" -o "$line-$i.jpg"
  done < "$input"
done
