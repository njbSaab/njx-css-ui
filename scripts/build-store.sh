#!/bin/bash
# build-store.sh — store-only build for themes.njxui.dev (Paddle-facing storefront).
# Same codebase, PUBLIC_STORE_MODE=1: reduced nav, canonical themes.njxui.dev,
# then the library pages are pruned from dist and / redirects to /themes/.
set -euo pipefail
cd "$(dirname "$0")/.."

PUBLIC_STORE_MODE=1 npm run build

D=dist
# prune library-only pages
rm -rf "$D/documentation" "$D/quickstart" "$D/overview" "$D/examples" "$D/demo" "$D/donate" "$D/index.html"
# sitemap was generated for the full site — drop it (store is small, robots still fine)
rm -f "$D"/sitemap*.xml
# root → storefront
cat > "$D/_redirects" <<'EOF'
/ /themes/ 302
/donate / 302
EOF
echo "store dist ready: $(find "$D" -name index.html | wc -l | tr -d ' ') pages"
find "$D" -maxdepth 2 -name index.html | sed 's|dist/||; s|/index.html||' | sort

# snapshot the built store into the private product repo (if checked out)
SNAP="$(dirname "$0")/../../njx-themes-site"
if [ -d "$SNAP/.git" ]; then
  rsync -a --delete "$D/" "$SNAP/site/"
  git -C "$SNAP" add -A
  if ! git -C "$SNAP" diff --cached --quiet; then
    git -C "$SNAP" commit -q -m "Store snapshot $(date +%Y-%m-%d_%H:%M)"
    git -C "$SNAP" push -q || echo "snapshot commit made; push failed (offline?)"
    echo "snapshot pushed to njx-themes-site"
  else
    echo "snapshot unchanged"
  fi
fi
