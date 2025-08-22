"use strict";

import "./functionUtilities.js";

export const DEFAULT_DELAY = 50;

/**
 * Utility function to throttle a function call involved in an intensive process.
 * 
 * Very useful for exmple with onmousemove and onscroll event.
 *  
 * @param {function} func - Function to throttle
 * @param {number} [delay=DEFAULT_DELAY] - Throttle delay, in ms
 * 
 * @returns {function} the throttled function.
 */
export const throttle = (
  func,
  delay = DEFAULT_DELAY,
  waitingCallback,
  wait = false,
  queued = false
) => 
  delay > 0 && (
  waitingCallback = Function.from(waitingCallback),
  function(...args) {
    if (wait) {
      queued = true;
      waitingCallback && waitingCallback(...args);
      return true;
    }

    func.apply(this || {}, args);
    wait = true;
    setTimeout(function() {
      queued && func.apply(this || {}, args);
      queued = wait = false;
    }, delay);
    return false;
  }
) || func;

// Exports.
Object.defineProperty(throttle, "DEFAULT_DELAY", {
  value: DEFAULT_DELAY
});
export default Object.freeze(Object.defineProperty(throttle, "throttle", {
  value: throttle
}));