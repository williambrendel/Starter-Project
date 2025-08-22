const path = require("path");

const _resolvePath = input => (
  Array.isArray(input) && path.resolve(...input.flat(Infinity)) || input
);

/**
 * Utility function to resolve a path.
 */
const resolvePath = input => {
  if (input && typeof input === "object" && !Array.isArray(input)) {
    const output = {};
    for (const k in input) {
      output[k] = _resolvePath(input[k]);
    }
    return output;
  }
  return _resolvePath(input);
}

// Exports.
module.exports = Object.freeze(Object.defineProperty(resolvePath, "resolvePath", {
  value: resolvePath
}));