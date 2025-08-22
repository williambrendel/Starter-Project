"use strict";

import getStylesheet from "../../../modules/utilities/getStylesheet.js";

export const BUTTON = getStylesheet(`
  input[type="submit"], input[type="submit"]:visited, input[type="submit"]:active, input[type="submit"]:disabled,
  input[type="button"], input[type="button"]:visited, input[type="button"]:active, input[type="button"]:disabled,
  input[type="reset"], input[type="reset"]:visited, input[type="reset"]:active, input[type="reset"]:disabled,
  .button, .button:visited, .button:active, .button:disabled,
  button, button:visited, button:active, button:disabled {

  /* Display */
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  overflow: hidden;

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

  /* Typography */
  font-weight: 500;
  text-wrap: balance;
  white-space: nowrap;

  /* To prevent long press text selection */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  }
`);

// Exports.
export default Object.freeze(Object.defineProperty(BUTTON, "BUTTON", {
  value: BUTTON
}));