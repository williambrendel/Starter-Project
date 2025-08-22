
"use strict";

/**
 * Utility function to get the clock, in millisecond.
 * 
 * @returns {function} the asyncified function.
 */
export const clock = () => performance.now();

// Exports.
export default Object.freeze(Object.defineProperty(clock, "clock", {
  value: clock
}));
