#!/bin/bash
# Fetch real imagery for GTSS Graduate Portfolio Hub via z-ai image-search
# Captures stdout JSON (CLI -o flag not functional in this version)
IMG=/home/z/my-project/scripts/img
mkdir -p "$IMG"

run_q() {
  key="$1"; query="$2"
  z-ai image-search -q "$query" -c 4 --gl us --no-rank 2>/dev/null | sed -n '/^{/,$p' > "$IMG/${key}.json"
  if [ -s "$IMG/${key}.json" ]; then echo "ok: $key ($(wc -c < $IMG/${key}.json) bytes)"; else echo "FAIL: $key"; fi
}

# Batch 1
run_q computer-science "software developer workspace with code on dark monitor screens moody lighting" &
run_q quantitative "financial data charts and graphs glowing on screens in a dark trading room" &
run_q science-lab "scientist using microscope in a modern research laboratory dark moody lighting" &
wait
# Batch 2
run_q information-sciences "modern university library interior with tall bookshelves and warm light" &
run_q education "teacher writing lesson on blackboard in classroom warm natural light" &
run_q agriculture "aerial view of green farmland fields and crop rows at golden hour" &
wait
# Batch 3
run_q arts-social "stack of old books and papers on wooden desk with dramatic side light" &
run_q campus "african university students walking together on modern campus golden hour" &
run_q graduates "african university graduates in gowns celebrating at graduation ceremony" &
wait
# Batch 4
run_q telecom "telecommunications tower with antennas silhouetted against dusk sky" &
run_q manufacturing "cnc machine cutting metal part with sparks in dark industrial factory" &
run_q process-plant "industrial chemical plant pipes and storage tanks at blue hour" &
wait
# Batch 5
run_q survey "civil engineer with theodolite surveying equipment on construction site" &
run_q aviation "air traffic control tower at airport at dusk with runway lights" &
wait
echo "ALL SEARCHES COMPLETE"
