"use strict";

import globalStyles from "../../../styles/core/stylesheets/global-styles.js";
import createComponent from "../../utilities/createComponent.js";
import createCustomEvent from "../../utilities/createCustomEvent.js";
import "../../utilities/functionUtilities.js";

// ####### TEMPLATE #######
// Create the template component.
const template = document.createElement("template"), content = template.content;

// Content.
const input = content.appendChild(document.createElement("div"));
input.setAttribute("id", "input");
input.setAttribute("role", "textbox");
input.setAttribute("contenteditable", "");

// ####### STYLES #######
// Create styles.
const styles = [globalStyles, `
  :host {
    --color: var(--black);
    --background: var(--white);
    display: flex;
    max-width: max-content;
    padding: 0;
    border: 0;
  }

  #input {
    font-size: 13px;
    vertical-align: middle;
    color: var(--color);
    border: none;
    background: none;
    max-height: 40dvh;
    min-width: 1ch;
    width: 100%;
    overflow-y: auto;
    scrollbar-width: thin;
    -webkit-user-select: text;
    -khtml-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }

  #input:not([contenteditable]){
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: not-allowed;
  }

  #input[placeholder]:not(:focus):has(*:empty)::before,
  #input[placeholder]:empty::before {
    color: rgb(from var(--color) r g b / 0.5);
    content: attr(placeholder);
    pointer-events: none;
  }

  #input[placeholder]:empty:focus::before {
    content: "";
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --color: var(--white);
      --background: var(--black);
    }
  }

  :host([darkmode]) {
    --color: var(--white);
    --background: var(--black);
  }

  :host([lightmode]) {
    --color: var(--black);
    --background: var(--white);
  }
`];

/**
 * TextInput component.
 * 
 * Example: <text-input></text-input>.
 * 
 */
export const TextInput = createComponent({
  tagName: "text-input",
  template,
  styles,
  privateProperties: {
    inputNode: null
  },
  constructor: function(privateProperties) {
    const inputNode = privateProperties.inputNode = privateProperties.shadow.childNodes[0],
      internals = privateProperties.internals;
    
    // Helper function to clear text.
    Object.defineProperty(this, "clear", {
      value: function(defaultValue = "") {
        internals.setFormValue(
          inputNode.textContent = defaultValue,
          undefined,
          { anchorElement: inputNode }
        );
        this.oninput && this.oninput(createCustomEvent({
          name: "clear",
          target: this
        }));
        return this;
      }
    });
    internals.setFormValue("", undefined, { anchorElement: inputNode });

    // Update form value with input text content.
    inputNode.addEventListener("input", () => (
      internals.setFormValue(inputNode.textContent, undefined, { anchorElement: inputNode })
    ));

    // Helper function to get textContent.
    Object.defineProperty(this, "textContent", {
      get() { return inputNode.textContent || ""; }
    });
  },
  methods: {
    // Once the component is connected to the dom.
    connectedCallback: function() {
      // Add attributes to main component.
      this.setAttribute("role", "textbox");
      this.setAttribute("tabindex", 0);

      // Set oninput.
      const oninput = Function.from(this.getAttribute("oninput") || this.oninput);
      oninput && (this.oninput = oninput) || (delete this.oninput);
    },

    // If the attribute changes, sync with it.
    attributeChangedCallback: function(privateProperties, name, oldValue, newValue) {
      if (oldValue === newValue) return;

      // Get input field node.
      const inputNode = privateProperties.inputNode;

      // Set form value.
      name === "disabled" && (
        this.hasAttribute("disabled") ? 
          inputNode.removeAttribute("contenteditable")
          : inputNode.setAttribute("contenteditable", "")
      );

      name === "placeholder" && (
        inputNode[newValue && "setAttribute" || "removeAttribute"]("placeholder", newValue)
      );
    },

    // Helper fucntion to focus the text field.
    focus: function(privateProperties, ...args) {
      privateProperties.inputNode.focus(...args);
      return this;
    },

    // Helper fucntion to blur the text field.
    blur: function(privateProperties, ...args) {
      privateProperties.inputNode.blur(...args);
      return this;
    }
  },
  staticProperties: {
    formAssociated: true,
    observedAttributes: ["placeholder", "disabled"]
  },
  elementAttributes: ["placeholder"],
  booleanElementAttributes: ["disabled"]
});

// Exports.
export default Object.freeze(Object.defineProperty(TextInput, "TextInput", {
  value: TextInput
}));