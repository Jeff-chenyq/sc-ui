#!/bin/bash
set -e

pnpm i --frozen-lockfile

pnpm build

cd dist/sc-ui
npm publish --access=public
# changeset publish --provenance
cd -

echo "✅ Publish completed"
