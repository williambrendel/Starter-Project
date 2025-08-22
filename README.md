## Launch Chrome without CORS check

On Mac:

    open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security --allow-file-access-from-files

On Linux:

    google-chrome --disable-web-security --allow-file-access-from-files

On Windows:

    chrome.exe --disable-web-security --allow-file-access-from-files

## Webpack

    npx webpack --config <client or server>/webpack.config.js

Note: you may need to sudo the command line.