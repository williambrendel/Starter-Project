"use strict";

import createSpinner from "./createSpinner.js";

/**
 * ThreeDotsSpinner component.
 * 
 * Example: <three-dots-spinner></three-dots-spinner>.
 * 
 * @param {string} [color="#111"] - The color of the spinner
 * @param {string} [size] - The size of the spinner: small|medium|large|xlarge
 * @param {number} [scale] - Scale factor to apply to the original size
 */
export const ThreeDotsSpinner = createSpinner({
  tagName: "three-dots-spinner",
  styles: `
    :host {
      display: block;
      --bg: no-repeat radial-gradient(circle closest-side, var(--color) 90%, transparent);
      background:
        var(--bg) 0%   50%,
        var(--bg) 50%  50%,
        var(--bg) 100% 50%;
      background-size: calc(100%/3.5) 80%;
      animation: anim 1s infinite; 
    }

    @keyframes anim {
        20%{background-position:0%   0%, 50%  50%,100%  50%}
        40%{background-position:0% 100%, 50%   0%,100%  50%}
        60%{background-position:0%  50%, 50% 100%,100%   0%}
        80%{background-position:0%  50%, 50%  50%,100% 100%}
    }
  `
});

// Exports.
export default Object.freeze(Object.defineProperty(ThreeDotsSpinner, "ThreeDotsSpinner", {
  value: ThreeDotsSpinner
}));