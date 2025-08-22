"use strict";

/**
 * Utility function to get the a child node index.
 *  
 * @param {object} element - An HTML element
 * 
 * @returns {number} the HTML element index in the parent node list.
 */
export const getChildNodeIndex = element => {
  let i = 0;
  for (; (element = element.previousSibling); i++);
  return i;
}

// Exports.
export default Object.freeze(Object.defineProperty(getChildNodeIndex, "getChildNodeIndex", {
  value: getChildNodeIndex
}));