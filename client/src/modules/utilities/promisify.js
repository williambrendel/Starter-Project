"use strict";

/**
 * Utility function to promisify a function.
 *  
 * @param {function} func - Function to be promisifyed
 * @param {boolean} [passResolveToFuncAsLastArgument=false] - If true, the resolve function is passed as the last argument of the input function
 * 
 * @returns {object} the promisifyed function.
 */
export const promisify = (
  func,
  passResolveToFuncAsLastArgument,
  makeAsync = func && func.constructor.name.toLowerCase().includes("async")
) => makeAsync && (
  passResolveToFuncAsLastArgument && 
    function (...args) {
      return new Promise(async function (resolve, reject) {
        try {
          if (resolve) await func(...args, resolve);
          else await func(...args);
        } catch (e) {
          if (reject) reject(e);
          else throw e;
        }
      });
    } || function (...args) {
      return new Promise(async function (resolve, reject) {
        try {
          const res = await func(...args);
          resolve && resolve(res);
        } catch (e) {
          if (reject) reject(e);
          else throw e;
        }
      });
    }
) || (
  passResolveToFuncAsLastArgument &&
  function (...args) {
    return new Promise(function (resolve, reject) {
      try {
        if (resolve) func(...args, resolve);
        else func(...args);
      } catch (e) {
        if (reject) reject(e);
        else throw e;
      }
    });
  } || function (...args) {
    return new Promise(function (resolve, reject) {
      try {
        const res = func(...args);
        resolve && resolve(res);
      } catch (e) {
        if (reject) reject(e);
        else throw e;
      }
    });
  }
);

// Exports.
export default Object.freeze(Object.defineProperty(promisify, "promisify", {
  value: promisify
}));