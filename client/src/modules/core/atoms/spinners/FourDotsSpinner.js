"use strict";

import createSpinner from "./createSpinner.js";

/**
 * FourDotsSpinner component.
 * 
 * Example: <four-dots-spinner></four-dots-spinner>.
 * 
 * @param {string} [color="#111"] - The color of the spinner
 * @param {string} [size] - The size of the spinner: small|medium|large|xlarge
 * @param {number} [scale] - Scale factor to apply to the original size
 */
export const FourDotsSpinner = createSpinner({
  tagName: "four-dots-spinner",
  styles: `
    :host {
      --bg: no-repeat radial-gradient(farthest-side, var(--color) 94%, transparent);
      background:
        var(--bg) 0    0,
        var(--bg) 100% 0,
        var(--bg) 100% 100%,
        var(--bg) 0    100%;
      background-size: 40% 40%;
      animation: anim .5s infinite; 
    }

    @keyframes anim {
      100% {
        background-position: 100% 0,100% 100%,0 100%,0 0
      }
    }
`
});

// Exports.
export default Object.freeze(Object.defineProperty(FourDotsSpinner, "FourDotsSpinner", {
  value: FourDotsSpinner
}));