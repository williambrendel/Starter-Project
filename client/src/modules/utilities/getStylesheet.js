"use strict";

/**
 * Utility function to create a style sheet.
 * 
 * @param {string} input - Style to create
 * 
 * @returns {object} Return the CSSStyleSheet object.
 */
export const getStylesheet = input => {
  if (input instanceof CSSStyleSheet) return input;
  if (typeof input === "string") {
    const output = new CSSStyleSheet();
    output.replaceSync(input); // Synchronous — avoids FOUC
    return output;
  }
  return null;
}

/**
 * Utility function to create an array of style sheets. Useful for document/shadow DOM adopted style sheets.
 * 
 * @param {string} input - Style to create
 * @param {string} [output] - Output array, like shadow.adoptedStyleSheet
 * 
 * @returns {array} Return the output array of style sheets.
 */
// Helper function to create adopted style sheets.
export const getStylesheets = (input, output = []) => {
  Array.isArray(input) || (input = [input]);
  for (let i = 0, l = input.length, o, s; i !== l; ++i) {
    Array.isArray(s = input[i]) && getStylesheets(s, output)
    || (
      (o = getStylesheet(s)) && output.push(o)
    );
  }
  return output;
}

// Exports.
getStylesheet.getStylesheets = getStylesheets;
export default Object.freeze(Object.defineProperty(getStylesheet, "getStylesheet", {
  value: getStylesheet
}));