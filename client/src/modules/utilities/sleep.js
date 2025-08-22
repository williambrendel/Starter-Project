"use strict";

export const DEFAULT_MS = 0;

/**
 * Utility function for sync sleep.
 *  
 * @param {number} [milliseconds=DEFAULT_MS] - Sleep time
 * 
 * @returns {boolean} true.
 */
export const sleep = (milliseconds = DEFAULT_MS) => {
  const t = Date.now();
  while (Date.now() - t < milliseconds);
  return true;
}

/**
 * Utility function for async sleep.
 *  
 * @param {number} [milliseconds=DEFAULT_MS] - Sleep time
 * 
 * @returns {Promise} a promise.
 */
export const asyncSleep = async (milliseconds = DEFAULT_MS) => (
  new Promise(resolve => setTimeout(resolve, milliseconds))
);

// Exports.
Object.defineProperty(sleep, "asyncSleep", {
  value: asyncSleep
});
Object.defineProperty(sleep, "DEFAULT_MS", {
  value: DEFAULT_MS
});
export default Object.freeze(Object.defineProperty(sleep, "sleep", {
  value: sleep
}));