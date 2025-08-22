"use strict";

import { getStylesheets } from "./getStylesheet.js";
import {
  defineElementAttribute,
  defineBooleanElementAttribute
} from "./defineElementAttribute.js";
import safeCall from "./safeCall.js";

/**
 * Utility function to create a custom element.
 * 
 * @param {object} [params] - The parameters of the custom element, such as tagName, methods, static props, etc.
 * 
 * @returns {class} the custom element.
 */
export const createComponent = params => {
  // Normalize input.
  typeof params === "function" && (params = parameters());
  let {
    tagName, // string
    baseClass, // class inherited from HTMLElement
    constructor, // function
    constr = constructor,
    methods, // object of key-value function
    staticProperties, // object of of key-value
    staticProps = staticProperties,
    privateProperties, // object of key-value
    privateProps = privateProperties,
    elementAttributes,  // array of string
    attributes = elementAttributes,
    attrs = attributes,
    booleanElementAttributes, // array of string
    booleanAttributes = booleanElementAttributes,
    boolAttrs = booleanAttributes,
    styles, // string or StyleSheet object or array of string/StyleSheet
    template, // HTMLElement inherited node
    defineShadow, // function
    options, // object
    ...other
  } = params || {};

  // If baseclass is not valid.
  (baseClass && baseClass.prototype instanceof HTMLElement) || (baseClass = HTMLElement);

  // If no additional functionality whithin the constructor is provided.
  typeof constr === "function" || (constr = null);

  // Methods to add to the custom element, the input being a key-value object where:
  // - keys are function names
  // - values are methods to add to the prototype.
  (methods && typeof methods === "object") || (methods = {});

  // Static props to add to the custom element, the input being a key-value object where:
  // - keys are propertiy names
  // - values are propertiy values. 
  (staticProps && typeof staticProps === "object") || (staticProps = {});

  // Private props to add to the custom element, the input being a key-value object where:
  // - keys are propertiy names
  // - values are default propertiy values. 
  (privateProps && typeof privateProps === "object") || (privateProps = null);

  // Custom element (array of) styles.
  // If specified, the custom element will automatically adopt them.
  styles = Object.freeze(getStylesheets(styles));

  // If a template or a function is provided to fill in the shadow node.
  typeof defineShadow === "function" || (defineShadow = (
    template instanceof HTMLTemplateElement && (
      shadow => shadow.appendChild(template.content.cloneNode(true))
    ) || (
      (template instanceof Element || template instanceof DocumentFragment) && (
        shadow => shadow.appendChild(template.cloneNode(true))
      )
    ) || (
      typeof template === "string" && (
        shadow => (shadow.innerHTML = template)
      )
    ) || null
  ));

  // Shadow dom creation options.
  options = {mode: "closed", ...(options || {})};

  // If formAssociated is specified, make the custom element visible to the parent form,
  // and add a "required" property automatically to specify if the input is required or not.
  staticProps.formAssociated && (
    staticProps.formAssociated = true,
    Array.isArray(staticProps.observedAttributes)
      || (staticProps.observedAttributes = []),
    staticProps.observedAttributes = Array.from(
      new Set([...staticProps.observedAttributes, "required"])
    )
  );

  // Element attributes.
  // Boolean attributes are attributes with no value in the element:
  // their existence means the value is true.
  attrs = normalizeAttributes(attrs);
  boolAttrs = normalizeAttributes(boolAttrs);
  if (staticProps.formAssociated) {
    let defined = false;
    for (let i = 0, l = boolAttrs.length; i !== l && !defined; ++i) {
      boolAttrs[i][0] === "required" && (defined = true);
    }
    defined || boolAttrs.push(["required"]);
    defined = false;
    for (let i = 0, l = attrs.length; i !== l && !defined; ++i) {
      attrs[i][0] === "missingValueMessage" && (defined = true);
    }
    defined || attrs.push(["missingValueMessage"]);
  }

  // In case methods/static props are not passed under the method/static props object.
  for (const name in other) {
    const value = other[name];
    typeof value === "function" && !methods[name] && (methods[name] = value) || (
      typeof value !== "function" && !staticProps[name] && (staticProps[name] = value)
    );
  }

  // Private props.
  const privates = new WeakMap;

  // Dynamically create the custom element class.
  class CustomElement extends baseClass {

    // Constructor.
    constructor(...args) {
      super();

      // Create private props.
      const props = privateProps && {...privateProps} || {};
      privates.set(this, props);

      // Create shadow dom.
      const shadow = props.shadow = this.attachShadow(options);

      // Add attributes.
      for (let i = 0, l = attrs.length; i !== l; ++i) {
        defineElementAttribute(this, ...attrs[i]);
      }
      for (let i = 0, l = boolAttrs.length; i !== l; ++i) {
        defineBooleanElementAttribute(this, ...boolAttrs[i]);
      }

      // Add internals if needed, i.e. if formAssociated is true:
      // - attach internals,
      // - add immutable hidden setFormValue method,
      // - add required prop.
      let internals, that, setFormValue;
      staticProps.formAssociated && (
        internals = props.internals = this.attachInternals(),
        that = this,
        setFormValue = internals.setFormValue,
        internals.setFormValue = function(
          value,
          state,
          {
            errorMessage,
            missingValueMessage = errorMessage,
            anchorElement
          } = {}
        ) {
          // Call original method.
          safeCall(setFormValue, internals, value, state);

          // Set validity.
          that.required && (
            value ?
            internals.setValidity({})
            : internals.setValidity(
              { valueMissing: true },
              missingValueMessage === undefined && (
                that.missingValueMessage || "Missing value"
              ) || missingValueMessage || "",
              anchorElement
            )
          );
        }
      );

      // Modify the shadowRoot getter if mode is closed, and make it immutable.
      options.mode === "closed" && Object.defineProperty(this, "shadowRoot", {
        get() { return null; },
        configurable: false,
        enumerable: false
      });

      // Prevent someone to attach a new shadow.
      Object.defineProperty(this, "attachShadow", {
        value() {
          throw new Error("Shadow already attached.");
        },
        configurable: false,
        writable: false
      });

      // Add styles.
      styles.length && (shadow.adoptedStyleSheets = styles);

      // If template is to be cloned or shadow to be defined.
      defineShadow && defineShadow(shadow);

      // If additionl stuff need to happen in the constructor.
      // The first argument passed to the constructor is always the private properties object.
      constr && safeCall(constr, this, privates.get(this), ...args);
    }
  }

  // Attach instance methods to prototype.
  const prototype = CustomElement.prototype;
  for (const name in methods) {
    const method = methods[name];
    typeof method === "function" && (
      prototype[name] = method.constructor.name.toLowerCase().includes("async") && (
        async function(...args) {
          // The first argument passed to the method is always the private properties object.
          return await safeCall(method, this, privates.get(this), ...args);
        }
      ) || (
        function(...args) {
          // The first argument passed to the method is always the private properties object.
          return safeCall(method, this, privates.get(this), ...args);
        }
      )
    );
  }
  Object.freeze(CustomElement.prototype);

  // Attach static properties.
  for (const name in staticProps) {
    Object.defineProperty(CustomElement, name, {
      value: staticProps[name],
      enumerable: false,
      configurable: false,
      writable: false
    });
  }
  styles && styles.length && Object.defineProperty(CustomElement, "styles", {
    value: styles,
    enumerable: false,
    configurable: false,
    writable: false
  });

  // Define the custom element.
  tagName && typeof tagName === "string" && customElements.define(tagName, CustomElement);

  // Return the custom element class.
  return CustomElement;
}

// Helper function to normalize input attributes.
const normalizeAttributes = (input, output = []) => {
  Array.isArray(input) || (input = input && [input] || []);
  let j = 0;
  for (let i = 0, l = input.length, v; i !== l; ++i) {
    v = input[i];
    Array.isArray(v) || (
      v = v && (
        typeof v === "object" && [v.name, v.callback, v.normalizer]
        || (
          typeof v === "string" && [v]
        )
      ) || []
    );
    v[0] && typeof v[0] === "string" && (output[j++] = v);
  }
  return output;
}

// Exports.
export default Object.freeze(Object.defineProperty(createComponent, "createComponent", {
  value: createComponent
}));