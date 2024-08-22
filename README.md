# Shineon Systems Website

This is a pretty large site containing blog material, webapps and community features.

`$ npm run dev` 

(Note: you need to build the `articles/index.json` file before the site can display the blog properly)

## Blog

The blog requires `jq` and `pandoc` utilities:

`$ brew install jq pandoc`

`$ scripts/md_html_json.sh` (`$ chmod +x scripts/md_json.sh` if needed)
