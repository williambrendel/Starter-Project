"use strict";

import createSpinner from "./createSpinner.js";

// Styles.
let styles = `
  :host {
    --ty: calc(var(--scale) * -6.5px);
  }

  :host div {
    box-sizing: border-box;
    position: absolute;
    top: calc(var(--scale) * 6.5px);
    left: calc(var(--scale) * 8.5px);
    width: calc(var(--scale) * 2.5px);
    height: calc(var(--scale) * 6.5px);
    border-radius: calc(var(--scale) * 1.25px);
    background: var(--color);
    animation: spinner 1s linear infinite;
    will-change: opacity;
  }

  @keyframes spinner {
    0% {
      opacity: 0.85;
    }
    50% {
      opacity: 0.25;
    }
    100% {
      opacity: 0.25;
    } 
  }
`;

// Spinner content.
const template = document.createElement("template"), content = template.content;
for (let i = 0, j = 1; i !== 8; ++i, ++j) {
  content.appendChild(document.createElement("div"));
  styles += `
  :host div:nth-child(${j}) {
    transform: rotate(${j * 45}deg) translateY(var(--ty));
    animation-delay: -${1.75 - j * 0.125}s;
  }`;
}

/**
 * LoadingSpinner component.
 * 
 * Example: <loading-spinner></loading-spinner>.
 * 
 * @param {string} [color="#111"] - The color of the spinner
 * @param {string} [size] - The size of the spinner: small|medium|large|xlarge
 * @param {number} [scale] - Scale factor to apply to the original size
 */
export const LoadingSpinner = createSpinner({
  tagName: "loading-spinner",
  template,
  styles
});

// Exports.
export default Object.freeze(Object.defineProperty(LoadingSpinner, "LoadingSpinner", {
  value: LoadingSpinner
}));