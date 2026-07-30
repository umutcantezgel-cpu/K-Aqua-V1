#!/bin/bash
echo '  "academy": {' > temp_academy_full.txt
# Read the keys from top_lv except the closing brace
cat academy_top_lv.json | grep -v '^}' | sed 's/^{//' >> temp_academy_full.txt
echo '    ,' >> temp_academy_full.txt
echo '    "videos": ' >> temp_academy_full.txt
cat academy_videos_lv.json >> temp_academy_full.txt
echo '    ,' >> temp_academy_full.txt
echo '    "quiz": ' >> temp_academy_full.txt
cat academy_quiz_lv.json >> temp_academy_full.txt
echo '    ,' >> temp_academy_full.txt
echo '    "schulungen": {' >> temp_academy_full.txt
# Merge schulungen 1 and 2
cat academy_schulungen_lv.json | grep -v '^}' | sed 's/^{//' >> temp_academy_full.txt
echo '    ,' >> temp_academy_full.txt
cat academy_schulungen_2_lv.json | grep -v '^{' >> temp_academy_full.txt
echo '    ,' >> temp_academy_full.txt
echo '    "zertifizierung": {' >> temp_academy_full.txt
cat academy_zertifizierung_lv.json | grep -v '^}' | sed 's/^{//' >> temp_academy_full.txt
echo '    ,' >> temp_academy_full.txt
cat academy_zertifizierung_2_lv.json | grep -v '^{' >> temp_academy_full.txt
echo '    ,' >> temp_academy_full.txt
echo '    "glossar": ' >> temp_academy_full.txt
cat academy_glossar_lv.json >> temp_academy_full.txt
echo '  }' >> temp_academy_full.txt
