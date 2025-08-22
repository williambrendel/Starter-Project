"use strict";

import getStylesheet from "../../../modules/utilities/getStylesheet.js";

export const LINK = getStylesheet(`
a, a:visited, a:active, a:disabled,
.link, .link:visited, .link:active, .link:disabled {
  opacity: 1;

  /* Appearance */
  color: inherit;
  background: none;
  text-decoration: none;
  -webkit-decoration: none;
  -webkit-text-decoration: none;

  /* Pointer event */
  pointer-events: auto;
  cursor: pointer;

  /* Annimation */
  transition: var(--transition-time);

  /* Spacing */
  margin: 0;
  padding: 0;
  border: 0;
}
`);

// Exports.
export default Object.freeze(Object.defineProperty(LINK, "LINK", {
  value: LINK
}));