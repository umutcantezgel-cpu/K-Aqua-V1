echo "{" > resources_final.json
cat resources_fi.json | sed '$d' >> resources_final.json
echo "," >> resources_final.json
cat resources_dl_fi.json >> resources_final.json
echo "," >> resources_final.json
cat resources_bim_fi.json >> resources_final.json
echo "," >> resources_final.json
cat resources_misc_fi.json >> resources_final.json
echo "}" >> resources_final.json
