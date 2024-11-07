#!/bin/bash

dirs=(components hooks local utils constants sc-ui eslint-config stylelint-config)

cd packages

for dir in "${dirs[@]}";
  do
    if [ -d "$dir" ]; then
      echo "目录 $dir 已存在，跳过创建"
    else
      mkdir -p "$dir"
      cd "$dir"
      pnpm init
      cd ..
    fi
done
echo "结束创建"
