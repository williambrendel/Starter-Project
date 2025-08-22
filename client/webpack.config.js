// Don't forget to do "npm i" to install all the packages
// npx webpack --config webpack.config.js
module.exports = require("../webpack/getConfig")({
  mode: "production",
  minimize: true,
  isModule: true,
  entry: {
    // Core.
    "modules/core/index.min": [__dirname, "./src/modules/core/index.js"],
    "modules/utilities/lockDown.min": [__dirname, "./src/modules/utilities/lockDown.js"],
    "styles/core/stylesheets/index.min": [__dirname, "./src/styles/core/stylesheets/index.js"],
    "styles/core/stylesheets/all.min": [__dirname, "./src/styles/core/stylesheets/all.js"],
    "styles/core/variables/index.min": [__dirname, "./src/styles/core/variables/index.css"],
    // App.
    "modules/app/index.min": [__dirname, "./src/modules/app/index.js"],
    "styles/app/stylesheets/index.min": [__dirname, "./src/styles/app/stylesheets/index.js"],
    "styles/app/variables/index.min": [__dirname, "./src/styles/app/variables/index.css"]
  },
  path: [__dirname, "min"]
});