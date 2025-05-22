#!/bin/bash
set -e
git init
git checkout -b main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git add .
git commit -m "Initial cleaned commit"
git push -u origin main
