"use strict";

/**
 * Utility function to have a cancelable timeout, instead of using clearTimeout.
 * 
 * Particularly useful when the oncancel callback is specified (functionality does not exists with clearTimeout).
 *  
 * @param {function} callback - A function called after the time is out
 * @param {number} [delay=0] - Delay in ms before the callback function is called
 * @param {function} [oncancel] - Function called if cancel is called
 * 
 * @returns {function} the cancel function to interrupt the timeout.
 */
const setCancellableTimeout = (callback, delay, oncancel) => {
  let cancelled = false,
    timeoutId = setTimeout(() => (
    cancelled || (callback && callback())
  ), delay);

  return (cb = oncancel) => (
    cancelled = true,
    clearTimeout(timeoutId),
    cb && cb()
  );
}

// Exports.
export default Object.freeze(Object.defineProperty(setCancellableTimeout, "setCancellableTimeout", {
  value: setCancellableTimeout
}));