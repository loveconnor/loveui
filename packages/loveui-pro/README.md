# LoveUI Pro Registry

Place paid registry JSON files in `public/r`.

The website serves these through `/pro/r/<name>.json`, which requires a valid
LoveUI Pro API key or access token. Do not expose this folder as static public
assets without the authenticated route in front of it.
