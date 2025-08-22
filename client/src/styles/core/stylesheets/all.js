"use strict";

import BUTTON from "./button.js";
import DOCUMENT from "./document.js";
import FLEXBOX from "./flexbox.js";
import GAP from "./gap.js";
import GLOBAL_STYLES from "./global-styles.js";
import LINK from "./link.js";

export const ALL = [
  GLOBAL_STYLES,
  DOCUMENT,
  GAP,
  FLEXBOX,
  LINK,
  BUTTON
];

// Exports.
export default Object.freeze(Object.defineProperty(ALL, "ALL", {
  value: ALL
}));