"use strict";

import getStylesheet from "../../../modules/utilities/getStylesheet.js";

export const DOCUMENT = getStylesheet(`
html,
body {
  background: var(--background);
  color: var(--color);
  font-weight: 300;
  font-size: 14px;
  min-width: 100dvw;                    /* Dynamic viewport */
  min-width: 100svw;                    /* Fallback for when UI is fully shown */
  min-width: 100lvw;                    /* Fallback for when UI is fully hidden */
  min-width: 100vw;                     /* Legacy fallback */
  min-width: -webkit-fill-available;    /* Safari / iOS Chrome */
  min-width: -moz-available;            /* Firefox */
  min-width: fill-available;            /* Draft spec */
  min-width: stretch;
  min-height: 100dvh;                   /* Dynamic viewport */
  min-height: 100svh;                   /* Fallback for when UI is fully shown */
  min-height: 100lvh;                   /* Fallback for when UI is fully hidden */
  min-height: 100vh;                    /* Legacy fallback */
  min-height: -webkit-fill-available;   /* Safari / iOS Chrome */
  min-height: -moz-available;           /* Firefox */
  min-height: fill-available;           /* Draft spec */
  min-height: stretch; 
}
`);

// Exports.
export default Object.freeze(Object.defineProperty(DOCUMENT, "DOCUMENT", {
  value: DOCUMENT
}));