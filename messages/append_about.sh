#!/bin/bash
sed -i '' -e '$ d' -e '$ d' lv.json
echo '    ]' >> lv.json
echo '  },' >> lv.json
echo '  "about": ' >> lv.json
cat about_lv.json >> lv.json
echo '}' >> lv.json
