"use strict";

import createSpinner from "./createSpinner.js";

/**
 * SquareSpinner component.
 * 
 * Example: <square-spinner></square-spinner>.
 * 
 * @param {string} [color="#111"] - The color of the spinner
 * @param {string} [size] - The size of the spinner: small|medium|large|xlarge
 * @param {number} [scale] - Scale factor to apply to the original size
 */
export const SquareSpinner = createSpinner({
  tagName: "square-spinner",
  styles: `
    :host {
      overflow: hidden;
      display: block;
    }
    
    :host::after {
      --margin: max(0.05 * var(--size), 1px);
      --square: calc(0.5 * var(--size) - var(--margin));
      --o0: calc(-1 * var(--square));
      --o1: var(--square);
      --o2: calc(2 * (var(--square) + var(--margin)));
      --box-shadow-1: var(--o1) var(--o1);
      --box-shadow-2: var(--o2) var(--o1);
      --box-shadow-3: var(--o2) var(--o2);
      --box-shadow-4: var(--o1) var(--o2);
      border-radius: max(0.25 * var(--square), 1px);

      content: "";
      color: var(--color);
      display: block;
      position: absolute;
      left: var(--o0);
      top: var(--o0);
      width: var(--square);
      height: var(--square);
      background: red;
      animation: anim 3s infinite;
      box-shadow: var(--box-shadow-1),
                  var(--box-shadow-1),
                  var(--box-shadow-1),
                  var(--box-shadow-1);
    }

    @keyframes anim {
      0% {
        box-shadow: var(--box-shadow-1),
                    var(--box-shadow-1),
                    var(--box-shadow-1),
                    var(--box-shadow-1);
      }
      8.33% {
        box-shadow: var(--box-shadow-1),
                    var(--box-shadow-2),
                    var(--box-shadow-2),
                    var(--box-shadow-2);
      }
      16.66% {
        box-shadow: var(--box-shadow-1),
                    var(--box-shadow-2),
                    var(--box-shadow-3),
                    var(--box-shadow-3);
      }
      24.99% {
        box-shadow: var(--box-shadow-1),
                    var(--box-shadow-2),
                    var(--box-shadow-3),
                    var(--box-shadow-4);
      }
      33.32% {
        box-shadow: var(--box-shadow-1),
                    var(--box-shadow-2),
                    var(--box-shadow-3),
                    var(--box-shadow-1);
      }
      41.65% {
        box-shadow: var(--box-shadow-2),
                    var(--box-shadow-2),
                    var(--box-shadow-3),
                    var(--box-shadow-2);
      }
      49.98% {
        box-shadow: var(--box-shadow-3),
                    var(--box-shadow-3),
                    var(--box-shadow-3),
                    var(--box-shadow-3);
      }
      58.31% {
        box-shadow: var(--box-shadow-4),
                    var(--box-shadow-4),
                    var(--box-shadow-3),
                    var(--box-shadow-4);
      }
      66.64% {
        box-shadow: var(--box-shadow-1),
                    var(--box-shadow-1),
                    var(--box-shadow-3),
                    var(--box-shadow-4);
      }
      74.97% {
        box-shadow: var(--box-shadow-1),
                    var(--box-shadow-2),
                    var(--box-shadow-3),
                    var(--box-shadow-4);
      }
      83.3% {
        box-shadow: var(--box-shadow-1),
                    var(--box-shadow-3),
                    var(--box-shadow-3),
                    var(--box-shadow-4);
      }
      91.63% {
        box-shadow: var(--box-shadow-1),
                    var(--box-shadow-4),
                    var(--box-shadow-4),
                    var(--box-shadow-4);
      }
      100% {
        box-shadow: var(--box-shadow-1),
                    var(--box-shadow-1),
                    var(--box-shadow-1),
                    var(--box-shadow-1);
      }
    }
  `
});

// Exports.
export default Object.freeze(Object.defineProperty(SquareSpinner, "SquareSpinner", {
  value: SquareSpinner
}));