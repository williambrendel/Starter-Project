"use strict";

// Helper functions to normalize input value.
const normalizeValue = value => (value || value === 0 || value === false) && `${value}` || null;
const normalizeBooleanValue = value => !!value;

/**
 * Utility function to define a node property reflecting on attribute.
 * 
 * @param {object} node - The input node to define the property on
 * @param {string} name - The name of the property
 * @param {func} [normalizer] - Use to normalize the new value while the property being set
 * 
 * @returns {object} the input node.
 */
export const defineElementAttribute = (
  node,
  name,
  callback,
  normalizer = normalizeValue
) => (
  typeof callback === "function" || (callback = null),
  typeof normalizer === "function" || (normalizer = null),
  Object.defineProperty(node, name, {
    get() {
      return node.getAttribute(name);
    },
    set(value) {
      normalizer && (value = normalizer(value));
      callback && callback(value);
      return value && (
        value === node.getAttribute(name, value)
          || node.setAttribute(name, value),
        value
      ) || (
        node.removeAttribute(name),
        value
      );
    }
  })
);

/**
 * Utility function to define a boolean node property reflecting on attribute.
 * 
 * @param {object} node - The input node to define the property on
 * @param {string} name - The name of the property
 * @param {func} [normalizer] - Use to normalize the new value while the property being set
 * 
 * @returns {object} the input node.
 */
export const defineBooleanElementAttribute = (
  node,
  name,
  callback,
  normalizer = normalizeBooleanValue
) => (
  typeof callback === "function" || (callback = null),
  typeof normalizer === "function" || (normalizer = null),
  Object.defineProperty(node, name, {
    get() {
      return node.hasAttribute(name);
    },
    set(value) {
      normalizer && (value = normalizer(value));
      callback && callback(value);
      return value && (
        !value !== node.hasAttribute(name)
          || node.setAttribute(name, ""),
        value
      ) || (
        node.removeAttribute(name),
        value
      );
    }
  })
);
  
// Exports.
defineElementAttribute.defineBooleanElementAttribute = defineBooleanElementAttribute;
export default Object.freeze(Object.defineProperty(defineElementAttribute, "defineElementAttribute", {
  value: defineElementAttribute
}));