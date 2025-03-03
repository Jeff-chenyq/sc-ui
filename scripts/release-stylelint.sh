#!/bin/bash
set -e

git status

pnpm changeset
pnpm changeset version

# version
version=$(node -p "require(process.cwd() + '/packages/stylelint-config/package.json').version")

git add .
git commit -m "chore(stylelint-config-version): $version"
git push

# commit
# npm version $version --message "[release] $version"


pnpm i --frozen-lockfile

cd packages/stylelint-config
npm publish --access=public
# changeset publish --provenance
cd ../..

echo "✅ Stylelint Publish completed"
