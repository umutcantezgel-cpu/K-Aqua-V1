#!/bin/bash
echo '  "markets": {' > markets_formatted.json
sed '1d;$d' markets_all_fixed.json | sed 's/^/  /' >> markets_formatted.json
echo '  },' >> markets_formatted.json
