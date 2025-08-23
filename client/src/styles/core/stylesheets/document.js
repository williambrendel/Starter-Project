"use strict";

import getStylesheet from "../../../modules/utilities/getStylesheet.js";

export const DOCUMENT = getStylesheet(`
html,
body {
  background: var(--background);
  color: var(--color);
  font-weight: 300;
  font-size: 14px;
}

html {
  width: 100dvw;
  height: 100dvh;
}

body {
  min-width: 100%;
  min-height: 100%;
  display: flow-root;
  overflow: auto;
}
`);

// Exports.
export default Object.freeze(Object.defineProperty(DOCUMENT, "DOCUMENT", {
  value: DOCUMENT
}));