#!/bin/bash
set -e

git status

pnpm changeset
pnpm changeset version

# version
version=$(node -p "require(process.cwd() + '/packages/sc-ui/package.json').version")

git add .
git commit -m "chore(version): $version"
git push

# commit
# npm version $version --message "[release] $version"


pnpm i --frozen-lockfile

pnpm build

cd dist/sc-ui
npm publish --access=public
# changeset publish --provenance
cd -

echo "✅ Publish completed"
