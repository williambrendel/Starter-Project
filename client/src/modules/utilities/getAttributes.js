"use strict";

/**
 * Utility function to get all attributes from a HTML element.
 * 
 * @param {string} element - HTML element to get the attribute from.
 * 
 * @returns {object} key-value attributes object.
 */
export const getAttributes = (element, defaultValue = "", output) => {
  output || (output = {});
  for (let i = 0, attributes = element.attributes, n = attributes.length || 0, attribute; i !== n; ++i) {
    output[(attribute = attributes[i]).nodeName] = attribute.nodeValue || defaultValue;
  }
  return output;
}

// Exports.
export default Object.freeze(Object.defineProperty(getAttributes, "getAttributes", {
  value: getAttributes
}));