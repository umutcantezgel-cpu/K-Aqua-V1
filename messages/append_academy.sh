#!/bin/bash
echo '  },' > temp_academy.txt
echo '  "academy": {' >> temp_academy.txt
# Read the keys from top_lv except the closing brace
cat academy_top_lv.json | grep -v '^}' | sed 's/^{//' >> temp_academy.txt
echo '    ,' >> temp_academy.txt
echo '    "videos": ' >> temp_academy.txt
cat academy_videos_lv.json >> temp_academy.txt
echo '    ,' >> temp_academy.txt
echo '    "quiz": ' >> temp_academy.txt
cat academy_quiz_lv.json >> temp_academy.txt
echo '    ,' >> temp_academy.txt
echo '    "schulungen": ' >> temp_academy.txt
cat academy_schulungen_lv.json >> temp_academy.txt
echo '    ,' >> temp_academy.txt
echo '    "zertifizierung": ' >> temp_academy.txt
cat academy_zertifizierung_lv.json >> temp_academy.txt
echo '    ,' >> temp_academy.txt
echo '    "glossar": ' >> temp_academy.txt
cat academy_glossar_lv.json >> temp_academy.txt
echo '  }' >> temp_academy.txt
echo '}' >> temp_academy.txt
