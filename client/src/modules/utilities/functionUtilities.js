"use strict";

import asyncify from "./asyncify.js";

// Helper function that does noting.
Function.void || Object.defineProperty(Function, "void", {
  value: () => {}
});

// Helper function to change a function name.
Function.setName || Object.defineProperty(Function, "setName", {
  value: (fn, name) => Object.defineProperty(fn, "name", {
    value: name,
    configurable: true,
  })
});

// Helper functions that filters non empty entities.
Function.exists || Object.defineProperty(Function, "exists", {
  value: x => x
});
Function.isDefined || Object.defineProperty(Function, "isDefined", {
  value: x => x !== undefined && x !== null
});
Function.identity || Object.defineProperty(Function, "identity", {
  value: x => x
});
Function.emptyString || Object.defineProperty(Function, "emptyString", {
  value: () => ""
});
Function.isFunction || Object.defineProperty(Function, "isFunction", {
  value: f => typeof f === "function"
});

// Helper function to normalize a function.
Function.from || Object.defineProperty(Function, "from", {
  value: (f, {defaultValue = undefined, async = false, makeAsync = async} = {}, g) => (
    f = typeof f === "function" && f
      || (typeof f === "string" && (
        g = f,
        function() { return eval(g); }
      ))
      || defaultValue,
    f && makeAsync && asyncify(f) || f
  )
});