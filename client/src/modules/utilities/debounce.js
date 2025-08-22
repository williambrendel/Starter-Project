"use strict";

export const DEFAULT_TIMEOUT = 300;

/**
 * Utility function to debounce a function call.
 * 
 * Very useful for onchange event handlers on input elements.
 * 
 * @param {function} func - The input function to be debounced
 * @param {function} [timeout=DEFAULT_TIMEOUT] - The debounced time, set to 300ms by default
 * 
 * @returns {function} the debounced function.
 */
export const debounce = (func, timeout = DEFAULT_TIMEOUT) => {
  let timeoutId;
  return timeout > 0 && (function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function() { func.apply(this || {}, args); }, timeout);
  }) || func;
}

// Exports.
Object.defineProperty(debounce, "DEFAULT_TIMEOUT", {
  value: DEFAULT_TIMEOUT
});
export default Object.freeze(Object.defineProperty(debounce, "debounce", {
  value: debounce
}));