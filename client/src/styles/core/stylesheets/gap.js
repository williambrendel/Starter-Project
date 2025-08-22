"use strict";

import getStylesheet from "../../../modules/utilities/getStylesheet.js";

export const GAP = getStylesheet(`
.gap {
  gap: var(--gap) !important;
}

.gap-half {
  gap: var(--gap-half) !important;
}

.gap-2x {
  gap: var(--gap-2x) !important;
}

.gap-3x {
  gap: var(--gap-3x) !important;
}

.gap-4x {
  gap: var(--gap-4x) !important;
}

.text-gap {
  gap: var(--text-gap) !important;
}

.text-gap-half {
  gap: var(--text-gap-half) !important;
}

.text-gap-2x {
  gap: var(--text-gap-2x) !important;
}

.text-gap-3x {
  gap: var(--text-gap-3x) !important;
}

.text-gap-4x {
  gap: var(--text-gap-4x) !important;
}
`);

// Exports.
export default Object.freeze(Object.defineProperty(GAP, "GAP", {
  value: GAP
}));