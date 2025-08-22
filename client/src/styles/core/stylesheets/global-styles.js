"use strict";

import getStylesheet from "../../../modules/utilities/getStylesheet.js";

export const GLOBAL_STYLES = getStylesheet(`

html,
body,
* {
  /* Font */
  font-family: var(--font-family);
  font-optical-sizing: auto;
  font-style: normal;
  color: var(--color);
  vertical-align: middle;

  /* Other */
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
  overflow-anchor: auto;
  scroll-behavior: smooth;
}

.scrollbar-hidden {
  /* IE and Edge */
  -ms-overflow-style: none;
  /* Firefox */
  scrollbar-width: none;
}

*[hidden],
.hidden,
.scrollbar-hidden::-webkit-scrollbar {
  display: none !important;
}

/* Remove Arrows/Spinners */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  appearance: textfield;
  -moz-appearance: textfield;
}

/* Default overscroll behavior */
*:not(.overscroll-behavior-auto) {
  overscroll-behavior: none;
}

/* Overflow */
*:not(img):not(video):not(canvas):not(body) {
  overflow: visible;
}

/* Remove outline on focused input */
*:focus {
  outline: none;
  outline-style: none;
}

html,
body,
table,
pre {
  margin: 0;
  padding: 0;
  border: 0;
}

pre {
  /* text-wrap: balance; */
  white-space: -moz-pre-wrap;
  white-space: -o-pre-wrap;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* User select */
nav,
img,
input[type="submit"], input[type="submit"]:visited, input[type="submit"]:active, input[type="submit"]:disabled,
input[type="button"], input[type="button"]:visited, input[type="button"]:active, input[type="button"]:disabled,
input[type="reset"], input[type="reset"]:visited, input[type="reset"]:active, input[type="reset"]:disabled,
.button, .button:visited, .button:active, .button:disabled,
button, button:visited, button:active, button:disabled,
a,
.user-select-none {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Old versions of Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
     supported by Chrome, Edge, Opera and Firefox */
}

:not(body):not([loading]),
:not(body):not(.loading) {
  transition: var(--transition-time);
}

`);

// Exports.
export default Object.freeze(Object.defineProperty(GLOBAL_STYLES, "GLOBAL_STYLES", {
  value: GLOBAL_STYLES
}));