"use strict";

import createSpinner from "./createSpinner.js";

/**
 * BlobSpinner component.
 * 
 * Example: <blob-spinner></blob-spinner>.
 * 
 * @param {string} [color="#111"] - The color of the spinner
 * @param {string} [size] - The size of the spinner: small|medium|large|xlarge
 * @param {number} [scale] - Scale factor to apply to the original size
 */
export const BlobSpinner = createSpinner({
  tagName: "blob-spinner",
  styles: `
    :host {
      display: grid;
      padding: calc(0.1 * var(--size));
      border-radius: var(--size);
      background: rgb(from var(--color) r g b / 0.3);
      animation: background 0.5s alternate infinite;
      will-change: background, transform; 
    }

    :host::before,
    :host::after {
      content: "";
      grid-area: 1/1;
      animation: border-radius 3s infinite alternate, background 1s alternate infinite -1s, outline 2s alternate infinite;
      background: rgb(from var(--color) r g b / 0.3);
      border-radius: 50%;
      will-change: opacity, background, outline;
      filter: blur(2px);
    }
    :host::after {
      animation-delay: -0.8s;
    }

    @keyframes background {
      from {
        background: rgb(from var(--color) r g b / 0.1);
        transform: scale(0.9);
      }

      to {
        background: rgb(from var(--color) r g b / 0.5);
        transform: scale(1);
      }
    }

    @keyframes outline {
      from {
        filter: none;
        outline: 0.5px solid rgb(from var(--color) r g b / 0.7);
      }

      to {
        filter: blur(2px);
        outline: 2px solid rgb(from var(--color) r g b / 0.2);
      }
    }

    @keyframes border-radius {
      12.5% {border-radius: 37% 63% 70% 30% / 30% 62% 38% 70%}
      25%   {border-radius: 84% 16% 15% 85% / 55% 79% 21% 45%}
      37.5% {border-radius: 73% 27% 74% 26% / 64% 32% 68% 36%}
      50%   {border-radius: 73% 27% 18% 82% / 52% 32% 68% 48%}
      62.5% {border-radius: 33% 67% 18% 82% / 52% 75% 25% 48%}
      75%   {border-radius: 12% 88% 69% 31% / 10% 66% 34% 90%}
      87.5% {border-radius: 50% 50% 70% 30% / 52% 62% 38% 48%}
    }
  `
});

// Exports.
export default Object.freeze(Object.defineProperty(BlobSpinner, "BlobSpinner", {
  value: BlobSpinner
}));