"use strict";

import "./functionUtilities.js";
import createCustomEvent from "./createCustomEvent.js";

/**
 * Utility function to normalize event handler, like onclick.
 * 
 * It create a custom event, add the details to it.
 * The following example adds details to an original onclick handler:
 * const myonclick = createEventHandler({eventHandler: onclick, detail: { text: "hello" }});
 * 
 * @param {function} eventHandler - The event handler function to normalize
 * @param {function} [postEventHandler] - A function run after the event handler
 * @param {object} [detail] - The event detail object
 * @param {string} [name="unknown"] - The custom event name, optional if an event is passed as an argument to the handler
 * @param {object} [target] - The custom event target, optional if an event is passed as an argument to the handler
 * @param {object} [detail] - The custom event detail
 * @param {object} [var_args] - The remaining options
 * 
 * @returns {function} the asyncified function.
 */
export const createEventHandler = ({
  func,
  callback = func,
  cb = callback,
  handler = cb,
  onevent = handler,
  eventHandler = onevent,
  end,
  close = end,
  postEventHandler = close,
  target,
  detail,
  name,
  cancelable,
  bubbles,
  checkValidity,
  ...options
})  => (
  eventHandler = Function.from(eventHandler, { makeAsync: true }),
  postEventHandler = Function.from(postEventHandler, { makeAsync: true }),
  checkValidity = Function.from(checkValidity, { makeAsync: true }),
  (typeof detail === "function" || typeof detail === "string") && (detail = Function.from(detail, { makeAsync: true })),
  async event => {

  // If an original event is passed.
  if (event instanceof Event) {
    // Stop default behavior and bubbling.
    typeof event.preventDefault === "function" && event.preventDefault();
    typeof event.stopPropagation === "function" && event.stopPropagation();

    // If not the right target.
    if ((target && event.target !== target) || (checkValidity && !(await checkValidity(event)))) return;
  }

  // Collect detail.
  if (typeof detail === "function") {
    detail = await detail();
  }
  detail && typeof detail === "object" || (detail = {});

  // Create event.
  name || (name = "unknown");
  event = createCustomEvent({
    event,
    target,
    detail,
    name,
    cancelable,
    bubbles,
    ...options
  });
  detail = event.detail;

  // Apply event handler.
  if (eventHandler) {
    await eventHandler(event);
    Object.assign(event.detail, detail); // Prevents overriding of details.
  } else if (!postEventHandler) {
    throw Error("Missing or wrong eventHandler input.");
  }
   
  // Run after event handler.
  postEventHandler && await postEventHandler(event);

  return false;
});

// Exports.
export default Object.freeze(Object.defineProperty(createEventHandler, "createEventHandler", {
  value: createEventHandler
}));
