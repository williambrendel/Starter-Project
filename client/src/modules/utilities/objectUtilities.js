"use strict";

// Helper function to assess if object is empty.
const isEmpty = o => {
  for (let k in o) return false;
  return true;
}
Object.isEmpty || Object.defineProperty(Object, "isEmpty", {
  value: o => !o || isEmpty(o)
});

// Helper function to parse a json string.
Object.from || Object.defineProperty(Object, "from", {
  value: (input, reject) => {
    if (typeof input === "object") return input;
    try {
      return JSON.parse(input);
    } catch(e) {
      reject && reject(e);
      return input;
    }
  }
});

// Helper function to make an object deep freeze.
Object.deepFreeze || Object.defineProperty(Object, "deepFreeze", {
  value: (obj, options, _refs) => {
    // Invalid input.
    if (!obj || typeof obj !== "object") return obj;

    // Prevent infinite recursion.
    if (_refs) {
      _refs instanceof Set || (_refs = new Set(Array.from(_refs)));
      if (_refs.has(obj)) return obj;
    } else _refs = new Set;
    _refs.add(obj);

    // If input object is an array, deep freeze all the items.
    if (Array.isArray(obj)) {
      for (let i = 0, l = obj.length; i !== l; ++i) Object.deepFreeze(obj[i], options, _refs);
      return Object.freeze(obj);
    }

    // Normalize input options.
    options || (options = { freezeNonEnumerables: true });

    // Freeze enumerables and non-enumerables.
    if (options.freezeNonEnumerables) {
      const keys = Object.getOwnPropertyNames(obj);
      for (let i = 0, l = keys.length; i !== l; ++i) {
        Object.deepFreeze(obj[keys[i]], options, _refs);
      }
    } else {
      // Freeze just enumerables.
      for (const key in obj) {
        Object.deepFreeze(obj[key], options, _refs);
      }
    }

    return Object.freeze(obj);
  }
});

// Helper function to make an object deep seal.
Object.deepSeal || Object.defineProperty(Object, "deepSeal", {
  value: (obj, options, _refs) => {
    // Invalid input.
    if (!obj || typeof obj !== "object") return obj;

    // Prevent infinite recursion.
    if (_refs) {
      _refs instanceof Set || (_refs = new Set(Array.from(_refs)));
      if (_refs.has(obj)) return obj;
    } else _refs = new Set;
    _refs.add(obj);

    // If input object is an array, deep seal all the items.
    if (Array.isArray(obj)) {
      for (let i = 0, l = obj.length; i !== l; ++i) Object.deepSeal(obj[i], options, _refs);
      return Object.seal(obj);
    }

    // Normalize input options.
    options || (options = { sealNonEnumerables: true });

    // Seal enumerables and non-enumerables.
    if (options.sealNonEnumerables) {
      const keys = Object.getOwnPropertyNames(obj);
      for (let i = 0, l = keys.length; i !== l; ++i) {
        Object.deepSeal(obj[keys[i]], options, _refs);
      }
    } else {
      // Seal just enumerables.
      for (const key in obj) {
        Object.deepSeal(obj[key], options, _refs);
      }
    }

    return Object.seal(obj);
  }
});

// Helper function to make an object deep copy.
Object.deepCopy || Object.defineProperty(Object, "deepCopy", {
  value: (obj, options, output, _refs) => {
    // Invalid input.
    if (!obj || typeof obj !== "object") return obj;

    // Prevent infinite recursion.
    if (_refs) {
      _refs instanceof Map || (
        _refs = new Map(Array.from(_refs).map(ref => Array.isArray(ref) && (
          ref.length > 1 && ref.slice(0, 2)
          || [ref[0] || obj, obj]
        ) || [ref || obj, ref || obj]))
      );
      const v = _refs.get(obj);
      if (v) return v;
    } else _refs = new Map;

    // If input object is an array, deep copy all the items.
    if (Array.isArray(obj)) {
      !Array.isArray(output) && (output = new Array(obj.length));
      let i = 0, l = output.length;
      _refs.set(obj, output);
      for (; i !== l; ++i) output[i] = Object.deepCopy(obj[i], options, null, _refs);
      for (l = obj.length; i !== l; ++i) output.push(Object.deepCopy(obj[i], options, null, _refs));
      output.length = obj.length;
      return output;
    }

    // Normalize input options.
    options || (options = {});
    const copySelf = options.copySelf || options.copySelf === undefined;

    // Init output and copy proptype keys if needed.
    output || (output = {});
    options.copyProptype && !(output instanceof obj.constructor) && (output = new obj.constructor);
    _refs.set(obj, output);
    
    // Copy attributes.
    if (options.copyNonEnumerables) {
      // Copy enumerables and non-enumerables.
      const keys = Object.getOwnPropertyNames(obj);
      for (let i = 0, l = keys.length; i !== l; ++i) {
        let v = obj[key], vv = !copySelf && _refs.get(v), key;
        if (vv) continue;
        key = keys[i];
        v = Object.deepCopy(v, options, null, _refs);
        (copySelf || !_refs.get(v)) && (output[key] = v);
      }
    } else {
      // Copy just enumerables.
      for (const key in obj) {
        let v = obj[key], vv = !copySelf && _refs.get(v);
        if (vv) continue;
        v = Object.deepCopy(v, options, null, _refs);
        (copySelf || !_refs.get(v)) && (output[key] = v);
      }
    }

    return output;
  }
});

// Helper function to make an object deep copy.
Object.augment || Object.defineProperty(Object, "augment", {
  value: (obj, ...otherObjs) => {
    if (obj && typeof obj !== "object") {
      throw Error("Input is not a valid object");
    }
    obj || (obj = {});
    for (let i = 0, l = otherObjs.length, o, p; i !== l; ++i) {
      if ((o = otherObjs[i]) && typeof o === "object") {
        for (const k in o) {
          if ((p = obj[k]) && typeof p === "object") {
            Object.augment(p, o[k]);
          } else if (
            (
              (p === undefined || p === null)
                && (p = o[k]) !== undefined && p !== null
            ) || (
              obj[k] === "" && (p = o[k]) && typeof p === "string"
            )
          ) {
            obj[k] = p;
          }
        }
      }
    }
    return obj;
  }
});