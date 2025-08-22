"use strict";

import asyncify from "./asyncify.js";
import setCancellableTimeout from "./setCancellableTimeout.js";

/**
 * Utility function to call a function in a loop, with a delay in between calls, and with the option to cancel the iterations.
 *  
 * @param {function} func - A function to be called iteratively
 * @param {function} [endCondition] - Function defining when the end of the recursion happens.
 * @param {number} [delay] - Delay between calls
 * @param {function} [ondone] - Function called once iteration is done
 * @param {function} [oncancel] - Function called if cancel is called
 * 
 * @returns {function} the cancel function to interrupt the timeout.
 */
const asyncLoop = ({
  process,
  todo = process,
  func = todo,
  end,
  endCondition = end,
  delay,
  ondone,
  oncancel
} = {}) => {
  let maxIters, d, cancel, doneReturnValue, cancelReturnValue;

  // Normalize function.
  func = asyncify(func);

  // Normalize endCondition.
  typeof endCondition === "number"
    || typeof endCondition === "function"
    || !isNaN(endCondition = parseInt(endCondition))
    || (endCondition = 0);  
  typeof endCondition === "number" && (
      maxIters = Math.max(endCondition, 0),
      endCondition = (n => n >= maxIters)
  );

  // Normalize delay.
  typeof delay === "number"
    || typeof delay === "function"
    || typeof (delay = parseInt(delay)) === "number"
    || (delay = 0);
  typeof delay === "number" && (
    d = delay,
    delay = (() => d)
  );

  // Normalize ondone.
  ondone !== undefined
    && typeof ondone !== "function"
    && (
      doneReturnValue = ondone,
      ondone = () => doneReturnValue
    );

  // Normalize oncancel.
  oncancel !== undefined
    && typeof oncancel !== "function"
    && (
      cancelReturnValue = oncancel,
      oncancel = () => cancelReturnValue
    );
  
  // Create the recursive function.
  const loop = async (...args) => {
    let canceled, n = 0;
    for (; !(canceled || endCondition(n)); ++n) {
      // Call the function.
      func && (await func(n, ...args));

      // Wait...
      await new Promise(resolve => (
        cancel = setCancellableTimeout(
          resolve,
          Math.max(delay() || 0, 0),
          () => (
            canceled = true,
            resolve()
          )
        )
      ));
    }

    return canceled && (
      oncancel && oncancel(n),
      Promise.resolve({
        canceled,
        n
      })
    ) || (
      ondone && ondone(n),
      Promise.resolve({
        canceled,
        n
      })
    );
  };

  // Add cancel functionality.
  loop.cancel = () => {
    let cb = cancel || (oncancel && (() => oncancel(0)));
    return cb && cb();
  }

  // Self export.
  Object.freeze(Object.defineProperty(loop, "loop", {
    value: loop
  }));

  return loop;
}

// Exports.
export default Object.freeze(Object.defineProperty(asyncLoop, "asyncLoop", {
  value: asyncLoop
}));