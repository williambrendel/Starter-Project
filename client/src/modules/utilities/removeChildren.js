"use strict";

/**
 * Utility function to remove node children.
 *  
 * @param {object} element - An HTML element
 * @param {object} [start] - Start child node to remove
 * @param {object} [end] - End child node to remove
 * 
 * @returns {object} the input HTML element.
 */
export const removeChildren = (element, start, end) => {
  let list;
  typeof start === "number" && (
    list = element.children || element.childNodes,
    start = list[start]
  );
  typeof end === "number" && (
    list || (list = element.children || element.childNodes),
    end = list[end]
  );
  if (start || end) {
    end = end && end.previousSibling || list[list.length - 1];
    start = start.previousSibling;
    let next;
    while (end !== start) {
      next = end.previousSibling;
      element.removeChild(end);
      end = next;
    }
  } else while (element.lastChild) {
    element.removeChild(element.lastChild);
  }
  return element;
}

// Exports.
export default Object.freeze(Object.defineProperty(removeChildren, "removeChildren", {
  value: removeChildren
}));