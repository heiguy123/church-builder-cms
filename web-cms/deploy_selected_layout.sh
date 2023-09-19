#!/bin/bash

# Get the selected layout as an argument (either "layout-1" or "layout-2")
selected_layout="$1"

# Check if a valid layout is selected
if [ "$selected_layout" != "layout-1" ] && [ "$selected_layout" != "layout-2" ]; then
  echo "Invalid layout selection. Please choose either 'layout-1' or 'layout-2'."
  exit 1
fi

# Determine the directory of the selected layout
layout_directory=""
if [ "$selected_layout" == "layout-1" ]; then
  layout_directory="../mobile-app/layout-1"  # Replace with the actual path to layout-1
elif [ "$selected_layout" == "layout-2" ]; then
  layout_directory="../mobile-app/layout-2"  # Replace with the actual path to layout-2
fi

# Change the working directory to the selected layout directory
cd "$layout_directory"

# Execute the deployment script for the selected layout
./deployment.sh