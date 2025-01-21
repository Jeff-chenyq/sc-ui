#!/bin/bash
set -e

pnpm changeset
pnpm changeset version

# version
version=$(node -p "require(process.cwd() + '/packages/sc-ui/package.json').version")
echo "Version: $version"

# commit
npm version $VERSION --message "[release] $VERSION"


pnpm i --frozen-lockfile

pnpm build

cd dist/sc-ui
npm publish --access=public
# changeset publish --provenance
cd -

echo "✅ Publish completed"
