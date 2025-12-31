#!/bin/bash

# Script to make 100 commits with changes to README.md

for i in {1..100}; do
  echo "Iteration $i of 100"
  
  # Add a line to README.md with timestamp and iteration number
  echo "" >> README.md
  echo "Commit #$i - $(date '+%Y-%m-%d %H:%M:%S')" >> README.md
  
  # Stage the changes
  git add README.md
  
  # Commit with a unique message
  git commit -m "Update README.md - Commit #$i - $(date '+%Y-%m-%d %H:%M:%S')"
  
  # Push to remote
  git push
  
  echo "Completed commit #$i"
  echo "---"
done

echo "All 100 commits completed!"




