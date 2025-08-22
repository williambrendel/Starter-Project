
"use strict";

/**
 * Utility function to make a function async.
 * 
 * @param {function} func - The input function to be asyncified
 * 
 * @returns {function} the asyncified function.
 */
export const asyncify = func => (
  typeof func === "function"
  && !func.constructor.name.toLowerCase().includes("async")
  && async function(...args) { return func(...args); }
  || func
);

// Exports.
export default Object.freeze(Object.defineProperty(asyncify, "asyncify", {
  value: asyncify
}));
