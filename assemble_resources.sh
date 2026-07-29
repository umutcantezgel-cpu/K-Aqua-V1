echo '  "resources": {' > scratch_patch_resources_full.json
cat scratch_patch_support.json >> scratch_patch_resources_full.json
echo ',' >> scratch_patch_resources_full.json
cat scratch_patch_downloads.json >> scratch_patch_resources_full.json
echo ',' >> scratch_patch_resources_full.json
cat scratch_patch_bim.json >> scratch_patch_resources_full.json
echo ',' >> scratch_patch_resources_full.json
cat scratch_patch_common.json >> scratch_patch_resources_full.json
echo ',' >> scratch_patch_resources_full.json
cat scratch_patch_ausschreibungstexte.json >> scratch_patch_resources_full.json
echo '  },' >> scratch_patch_resources_full.json
