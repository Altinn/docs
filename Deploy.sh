#!/bin/bash

echo -e "\033[0;32mDeploying changes to Brreg docs...\033[0m"

# Build the project.
hugo

# Add changes to git.
git add -A

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master
git subtree push --prefix=public https://github.com/brreg/docs.git gh-pages