#!/bin/bash
sed -i '' '$d' sw.json
echo '  },' >> sw.json
echo '  "markets": {' >> sw.json
echo '    "landwirtschaft": ' >> sw.json
cat landwirtschaft_sw.json >> sw.json
echo '  }' >> sw.json
echo '}' >> sw.json
