"use strict";

import createSpinner from "./createSpinner.js";

/**
 * PulseSpinner component.
 * 
 * Example: <pulse-spinner></pulse-spinner>.
 * 
 * @param {string} [color="#111"] - The color of the spinner
 * @param {string} [size] - The size of the spinner: small|medium|large|xlarge
 * @param {number} [scale] - Scale factor to apply to the original size
 */
export const PulseSpinner = createSpinner({
  tagName: "pulse-spinner",
  styles: `
  :host::after,
    :host::before {
      content: "";  
      box-sizing: border-box;
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      border: 1.5px solid var(--color);
      background: rgb(from var(--color) r g b / 0.1);
      position: absolute;
      left: 0;
      top: 0;
      box-shadow: inset 0 0 calc(0.2 * var(--size)) rgb(from var(--color) r g b / 0.8);
      animation: anim 2s linear infinite;
      will-change: transform, opacity;
    }
    :host::after {
      animation-delay: -1s;
    }

    @keyframes anim {
      0% {
        transform: scale(0);
        opacity: 1;
      }

      50% {
        opacity: 0.7;
      }

      100% {
        transform: scale(1);
        opacity: 0;
      }
    }
  `
});

// Exports.
export default Object.freeze(Object.defineProperty(PulseSpinner, "PulseSpinner", {
  value: PulseSpinner
}));