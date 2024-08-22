#!/bin/bash

# Define the directory to search (current directory by default)
directory="${1:-."/articles"}"

# Initialize the JSON object
json_object="{}"

# Use the find command to locate all .md files and iterate over them
for file_path in $(find "$directory" -type f -name "*.md"); do
    # Convert Markdown to HTML using Pandoc
    file_contents=$(pandoc "$file_path" -t html | jq -Rs .)
    
    # Add the file path and contents to the JSON object
    json_object=$(echo "$json_object" | jq --arg path "$file_path" --arg contents "$file_contents" \
                   '. + {($path): $contents}')
done

# Save the final JSON object to an index.json file within the specified directory
echo "$json_object" | jq . > "$directory/index.json"