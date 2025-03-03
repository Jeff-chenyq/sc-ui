#!/bin/bash
set -e

git status

pnpm changeset
pnpm changeset version

# version
version=$(node -p "require(process.cwd() + '/packages/eslint-config/package.json').version")

git add .
git commit -m "chore(eslint-config-version): $version"
git push

# commit
# npm version $version --message "[release] $version"


pnpm i --frozen-lockfile

pnpm build-eslint

cd packages/eslint-config
npm publish --access=public
# changeset publish --provenance
cd ../..

echo "✅ Eslint Publish completed"
