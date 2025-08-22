/**
 * Create a an enum of flags from inut names.
 * 
 * For example flags = createFlags("good", "bad", "ugly") will produce: { good: 1, bad: 2, ugly: 4 }
 * Now to create a code that has bad AND ugly you simply do:
 * code = flags.bad | flags.ugly
 * 
 * @param {...string} var_args - Flag names
 * 
 * @returns {object} the object containing flag names as keys and their corresponding values.
 */
export const createFlags = Flag.createFlags = (...names) => {
  const output = {};
  for (let i = 0, l = (names = names.flat(Infinity)).length, n, j = 1; i !== l; ++i) {
    output[n = names[i]] || (output[n] = j, j <<= 1);
  }
  Object.defineProperty(output, "toString", {
    value: function (...args) { return JSON.stringify(this, ...args); }
  });
  Object.defineProperty(output, "contains", {
    value: contains
  });
  Object.defineProperty(output, "intersects", {
    value: intersects
  });
  return output;
}

/**
 * Check if the reference set of flags (a number of the form ref = flag1 | ... | flagN) fully contains the target (also a number).
 * 
 * @param {number} ref - The reference set of flags to contain the target
 * @param {number} target - The target set of flags to be contained in the reference
 * 
 * @returns {boolean} true if all the flags in the target are in the reference.
 */
export const contains = createFlags.contains = (ref, target) => (ref & target) === target;

/**
 * Check if the reference set of flags (a number of the form ref = flag1 | ... | flagN) partially contains the target (also a number).
 * 
 * @param {number} ref - The reference set of flags to intersect with the target
 * @param {number} target - The target set of flags to intersect with the reference
 * 
 * @returns {boolean} true if some flags are common to both the target and the reference.
 */
export const intersects = createFlags.intersects = (ref, target) => (ref & target) > 0;

// Exports.
export default Object.freeze(Object.defineProperty(createFlags, "createFlags", {
  value: createFlags
}));