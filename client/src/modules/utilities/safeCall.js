"use strict";

/**
 * Utility function for safe calling a function with an instance and the input parameters.
 *  
 * @param {function} func - function to call
 * @param {function} [instance] - instance to apply the call on
 * @param {...any} [parameters] - remaining parameters
 * 
 * @returns {any} what the function returns.
 */
export const safeCall = Function.prototype.call.bind(Function.prototype.call);

/**
 * Utility function for safe apply a function with an instance and the input parameters.
 *  
 * @param {function} func - function to call
 * @param {function} [instance] - instance to apply the call on
 * @param {Array<any>} [parameters] - remaining parameters
 * 
 * @returns {any} what the function returns.
 */
export const safeApply = Reflect.apply.bind(Reflect);

export default Object.freeze(Object.defineProperty(safeCall, "safeCall", {
  value: safeCall
}));