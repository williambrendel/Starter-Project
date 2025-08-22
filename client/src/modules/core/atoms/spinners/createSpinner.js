"use strict";

import createComponent from "../../../utilities/createComponent.js";
import defineElementAttribute from "../../../utilities/defineElementAttribute.js";
import getStylesheet from "../../../utilities/getStylesheet.js";

// Base class styles, props and methods.
const _styles = getStylesheet(`
  :host {
    --color: #111;
    --scale: 1;
    --size: calc(var(--scale) * 20px);

    display: inline-block;
    position: relative;
    width: var(--size);
    height: var(--size);
    min-height: var(--size);
    box-sizing: border-box;
  }

  :host([tiny]) {
    --scale: 0.6;
  }

  :host([small]) {
    --scale: 0.8;
  }

  :host([medium]) {
    --scale: 1.5;
  }

  :host([large]) {
    --scale: 2;
  }

  :host([extra-large]),
  :host([extralarge]),
  :host([xlarge]) {
    --scale: 3;
  }

  :host([dark]) {
    --color: #111;
  }

  :host([light]) {
    --color: #F0F0F0;
  }

  :host([white]) {
    --color: white;
  }

  :host([black]) {
    --color: black;
  }

  :host([error]),
  :host([red]) {
    --color: #F95959;
  }

  :host([success]),
  :host([green]) {
    --color: #49B954;
  }

  :host([warning]),
  :host([orange]) {
    --color: #FBA601;
  }

  :host([info]),
  :host([blue]) {
    --color: #24A0ED;
  }

  :host([darkmode]),
  :host([dark-mode]) {
    --color: #F0F0F0;
  }

  :host([lightmode]),
  :host([light-mode]) {
    --color: #111;
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --color: #F0F0F0;
    }
  }
`),
constructor = function() {
  defineElementAttribute(this, "color");
  defineElementAttribute(this, "scale");
},
methods = Object.freeze({
  attributeChangedCallback: function(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    newValue.startsWith("--") && (newValue = `var(${newValue})`);
    name === "color" && this.style.setProperty('--color', newValue);
    name === "scale" && this.style.setProperty('--scale', newValue);
  }
}),
staticProperties = Object.freeze({
  observedAttributes: ["color", "scale"]
});

// Spinner helper function.
export const createSpinner = ({
  styles,
  ...other
} = {}) => createComponent({
  styles: styles && [_styles, styles] || _styles,
  constructor,
  methods,
  staticProperties,
  ...other
});

// Exports.
export default Object.freeze(Object.defineProperty(createSpinner, "createSpinner", {
  value: createSpinner
}));