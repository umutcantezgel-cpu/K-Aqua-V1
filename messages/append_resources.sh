#!/bin/bash
# Assemble resources JSON
echo '  },' > temp_resources.txt
echo '  "resources": {' >> temp_resources.txt
echo '    "common": ' >> temp_resources.txt
cat resources_common_lv.json >> temp_resources.txt
echo '    ,' >> temp_resources.txt
echo '    "ausschreibungstexte": ' >> temp_resources.txt
cat resources_ausschreib_lv.json >> temp_resources.txt
echo '    ,' >> temp_resources.txt
echo '    "downloads": ' >> temp_resources.txt
cat resources_downloads_lv.json >> temp_resources.txt
echo '    ,' >> temp_resources.txt
echo '    "bim": ' >> temp_resources.txt
cat resources_bim_lv.json >> temp_resources.txt
echo '    ,' >> temp_resources.txt
echo '    "support": ' >> temp_resources.txt
cat resources_support_lv.json >> temp_resources.txt
echo '  }' >> temp_resources.txt
echo '}' >> temp_resources.txt
