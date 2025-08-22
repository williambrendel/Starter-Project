"use strict";

import "./stringUtilities.js";

// Check if input is an event.
const isSubmitEvent = event => {
  if (!event || typeof event !== "object") return false;
  else if (event.target && event.target instanceof HTMLFormElement) return true;
  try {
    return event instanceof SyntheticBaseEvent || event instanceof SubmitEvent;
  } catch {
    return event instanceof SubmitEvent;
  }
}

/**
 * Utility function to create data from a form.
 * 
 * @param {object} input - An event or the form html element.
 * @param {object} [defaultOutput=new FormData] - Default form data output.
 * 
 * @returns {object} the FormData object.
 */
export const getFormData = (input, defaultOutput = new FormData) => {
  if (!input || typeof input !== "object") return new FormData;
  let submitter;

  // If input is an event instead of a form.
  input instanceof HTMLFormElement || (isSubmitEvent(input) && (
    submitter = input.submitter || (
      input.relatedTarget && (
        (input.relatedTarget.type || input.relatedTarget.getAttribute("type")) === "submit"
        || input.relatedTarget.nodeName.toLowerCase() === "button"
      ) && input.relatedTarget
    ),
    input = input.target
  ));

  submitter && (
    submitter = ({
      name: submitter.name || submitter.getAttribute("name"),
      value: submitter.value || submitter.getAttribute("value")
    }),
    submitter.value || (submitter.value = !!submitter.name)
  );

  // If we can"t capture the form element.
  if (!(input instanceof HTMLFormElement)) return defaultOutput;

  // Format data, ignoring empty values.
  input = new FormData(input);
  submitter && submitter.name && input.append(submitter.name, submitter.value);

  // Make the keys camel case and trim empty values.
  let newKey;
  input.forEach((value, key) => {
    (typeof value === "number" || typeof value === "boolean" || value) && (
      (newKey = key.toCamelCase()) === key || (
        input.delete(key),
        input.append(newKey, value)
      )
    ) || input.delete(key);
  });

  // Add the JSON conversion method.
  typeof input.toJSON === "function" || Object.defineProperty(input, "toJSON", {
    value: function(output) {
      output || (output = {});
      // Collect the data.
      input.forEach((value, key) => {
        // Reflect.has in favor of: object.hasOwnProperty(key)
        Reflect.has(output, key) && (
          Array.isArray(output[key]) && output[key].push(value) || (output[key] = [output[key], value])
        ) || (
          output[key] = value
        );
      });
      return output;
    }
  });

  // Return output.
  return input;
};

// Exports.
getFormData.isSubmitEvent = isSubmitEvent;
export default Object.freeze(Object.defineProperty(getFormData, "getFormData", {
  value: getFormData
}));