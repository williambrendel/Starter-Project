"use strict";

import "./objectUtilities.js";
import "./stringUtilities.js";

/**
 * Utility function to create a custom event.
 * 
 * @param {string} [name="unknown"] - The event name, optional if an event is passed as an argument
 * @param {object} [target] - The event target
 * @param {object} [detail] - The event detail
 * @param {object} [event] - An original event to inherit from
 * @param {object} [var_args] - The remaining options
 * 
 * @returns {function} the asyncified function.
 */
export const createCustomEvent = ({
  name,
  target,
  data,
  detail,
  event,
  cancelable,
  bubbles,
  ...options
} = {}) => {
  // Normalize detail.
  detail && typeof detail === "object" || (detail = {});

  // If input event is passed.
  const hasPreviousEvent = event instanceof Event;
  if (hasPreviousEvent) {
    target instanceof Node || (target = event.target);
    name || (name = event.type);
    Object.augment(detail, event.detail || null);
    cancelable !== undefined || (cancelable = event.cancelable);
    bubbles !== undefined || (bubbles = event.bubbles);
  } else if (event && typeof event === "object") {
    Object.augment(detail, event);
  }

  // If additional data is passed
  data !== undefined && data !== null && Object.augment(detail,
    (typeof data !== "object" || Array.isArray(data)) && (
      { data }
    ) || data
  );

  // Finalize options.
  Object.assign(options, { cancelable, bubbles, detail });
  typeof options.detail.action === "string" && (!options.detail.actionKey) && (
    options.detail.actionKey = String.toCamelCase(options.detail.action, true)
  );

  // Create event.
  const output = new CustomEvent(name || "unknown", options);
  output.detail.eventType = output.type;

  // Fill with remaining props if input event is passed.
  if (hasPreviousEvent) {
    for (const k in event) {
      if (k === "cancelable" || k === "bubbles" || k === "detail") continue;
      try {
        output[k] = event[k];
      } catch {}
    }
  }

  // Add target.
  target instanceof Node && (
    Object.defineProperty(output, "target", {
      get() { return target}
    }),
    output.detail.targetName || (output.detail.targetName = (target.tagName || "").toLowerCase())
  );

  // Return output.
  return output;
}

// Exports.
export default Object.freeze(Object.defineProperty(createCustomEvent, "createCustomEvent", {
  value: createCustomEvent
}));
