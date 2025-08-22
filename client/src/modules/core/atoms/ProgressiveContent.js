"use strict";

import HTMLCustomElement from "../HTMLCustomElement.js";
import "../../utilities/functionUtilities.js";
import asyncLoop from "../../utilities/asyncLoop.js";
import {
  defineNodeProperty,
  defineBooleanNodeProperty
 } from "../../utilities/defineNodeProperty.js";
import removeChildren from "../../utilities/removeChildren.js";
import "../atoms/spinners/index.js";
import globalStyles from "../../../styles/stylesheets/global-styles.js";

/**
 * ProgressiveContent component.
 * 
 * Example: <progressive-content></progressive-content>.
 * 
 */
export const ProgressiveContent = (() => { // START OF ENCAPSULATION.

// Globals.
const CARET = "⬤",
  DELAY = 15,
  SPINNER = "four-dots-spinner",
  SPINNER_SIZE = "small";

// Helper function to randomize the delay to mimic human input.
const getRandomizedDelay = delay => () => Math.round(delay > 30 && (delay + Math.random() * 60 - 30) || (delay * (0.8 + Math.random() * 0.4)));

// Helper function to add text progressively.
const addText = async (
  i,
  textNode,
  text
) => textNode.textContent = text.slice(0, i + 1) + (
  CARET && (
    i < text.length - 3 && ` ${CARET}`
    || i < text.length - 2 && `${CARET}`
  )
  || ""
);

// Helper function to add content progressively.
const addContent = async (
  i,
  input,
  target,
  delay,
  cancels = new Set
) => {
  const cur = input[i], l = input.length;

  // Check if the node is pure text, and if yes do the text animation.
  if (cur.nodeType === Node.TEXT_NODE || cur.__text_only__) {
    // Get original text and create character add loop.
    const text = cur.textContent,
      { loop, cancel } = asyncLoop({
        func: addText,
        delay,
        end: text.length
      });

    // To cancel the animation.
    cancels.add(cancel);

    // Clear current view.
    cur.textContent = "";
    target.appendChild(cur);

    // Loop, i.e. animate.
    await loop(cur, text).then(() => cancels.delete(cancel));
  } else {
    // No need to animate, just add the node.
    target.appendChild(cur);
  }
}

// Final progressive add.
const add = async (
  input,
  target,
  delay,
  parser,
  cancels = new Set
) => {
  // Normalize input.
  typeof input === "string" && (
    input = Array.from((parser || (parser = new DOMParser())).parseFromString(input, "text/html").body.childNodes)
  ) || (input instanceof Node && (input = [input]))
  || ((Array.isArray(input) || input instanceof NodeList || input instanceof HTMLCollection) && (input = Array.from(input)))
  || (input = []);

  // Normalize text nodes so formating is maintained.
  for (let i = 0, l = input.length, node, newNode; i !== l; ++i) {
    (node = input[i]).nodeType === Node.TEXT_NODE && (
      (newNode = input[i] = document.createElement("pre")).textContent = (node.textContent || "").replace(/^[\n\r]+|[\n\r\s]+$/g, ""),
      newNode.__text_only__ = true
    );
  }

  // Remove unecessary nodes.
  input = input.filter(x => (x.nodeType !== Node.TEXT_NODE && !x.__text_only__) || x.textContent);

  // Normalize delay.
  delay = Math.max(parseFloat(delay) || 0, 0);

  // If no animation.
  if (!delay) {
    const fragment = document.createDocumentFragment();
    for (let i = 0, l = input.length; i !== l; ++i) {
      fragment.appendChild(input[i]);
    }
    target.appendChild(fragment);
    return;
  }

  // Randomize delay.
  delay = getRandomizedDelay(delay);

  // Create loop.
  const { loop, cancel } = asyncLoop({
    func: addContent,
    delay,
    end: input.length
  });
  cancels.add(cancel);

  // Animate, i.e. run the loop with delays between each iteration.
  await loop(input, target, delay, cancels).then(() => {
    // Clean input.
    for (let i = 0, l = input.length; i !== l; ++i) input[i] = null;
    input.length = 0;
    cancels.delete(cancel);
  });
}

// ####### TEMPLATE #######
// Create the template component.
const template = document.createElement("template"), content = template.content;
//content.appendChild(...)

// ####### STYLES #######
// Create styles.
const styles = HTMLCustomElement.getStylesheets([globalStyles, `
  :host {
    --color: var(--black);
    --background: var(--white);
    vertical-align: center;
  }

  :host([thinking]) {
    line-height: 16px;
  }

  * {
    font-weight: 300;
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
`]);

// ####### COMPONENT #######
return class ProgressiveContent extends HTMLCustomElement {
  // Define a static template using the base class's symbol
  static get [HTMLCustomElement.templateAccessor]() {
    return template;
  };

  // Define a static style using the base class's symbol
  static get [HTMLCustomElement.stylesAccessor] () {
    return styles;
  };

  // Private properties.
  #shadow;
  #parser = new DOMParser();
  #cancels = new Set;
  #initialized = false;
  #animating = 0;
  #currentContent = null;

  // Static properties.
  static observedAttributes = [
    "value",
    "innerhtml",
    "inner-html",
    "textcontent",
    "text-content",
    "innertext",
    "inner-text",
    "thinking"
  ];

  // Constructor.
  constructor() {
    // The shadow is already created.
    // The template will automatically be cloned if defined above.
    // The default style sheet is included.
    super();

    // Access shadow.
    const shadow = this.#shadow = this[HTMLCustomElement.shadowAccessor]();

    // Clean immediate child nodes.
    removeChildren(this);

    // Content getter.
    Object.defineProperty(this, "content", {
      get() {
        return this.hasAttribute("thinking") && (
            `<${SPINNER} ${SPINNER_SIZE || ""} style="float:left; margin-right: 5px"></${SPINNER}> ${this.getAttribute("thinking") || ""}`
          ) || this.getAttribute("innerhtml")
          || this.getAttribute("inner-html")
          || this.getAttribute("textcontent")
          || this.getAttribute("text-content")
          || this.getAttribute("innertext")
          || this.getAttribute("inner-text")
          || this.getAttribute("value")
          || "";
      }
    });

    // Getter/Setter: innerHTML.
    Object.defineProperty(this, "innerHTML", {
      get() {
        return this.innerHTML;
      },
      async set(value) {
        this.#currentContent = value;
        ++this.#animating;
        this.animating = true;
        Array.isArray(value)
          || value instanceof NodeList
          || value instanceof HTMLAllCollection
          || (value = `${value}`);
        this.clear();
        await add(value, shadow, this.delay, this.#parser, this.#cancels);
        this.ondone && this.ondone();
        this.#animating = Math.max(this.#animating - 1, 0);
        this.#animating || this.thinking !== null || (this.animating = false);
        return value;
      }
    });

    // Getter/Setter: textContent.
    Object.defineProperty(this, "textContent", {
      get() {
        return this.innerHTML;
      },
      set(value) {
        return this.innerHTML = value;
      }
    });

    // Getter/Setter: innerText.
    Object.defineProperty(this, "innerText", {
      get() {
        return this.innerHTML;
      },
      set(value) {
        return this.innerHTML = value;
      }
    });

    // Getter/Setter: value.
    Object.defineProperty(this, "value", {
      get() {
        return this.innerHTML;
      },
      set(value) {
        return this.innerHTML = value;
      }
    });

    // Getter/Setter: delay.
    defineNodeProperty(this, "delay");

    // Helper getter/setter to activate/deactivate thinking.
    defineNodeProperty(this, "thinking");

    // Helper getter/setter to activate/deactivate animating.
    defineBooleanNodeProperty(this, "animating");
  }

  // Configure the shadow dom.
  connectedCallback() {
    // Ondone event.
    const ondone = Function.from(this.getAttribute("ondone") || this.ondone);
    ondone && (this.ondone = ondone);

    // Set defaults.
    this.getAttribute("delay") || (this.delay = DELAY);

    // Get content.
    this.innerHTML = this.content;

    this.#initialized = true;

    // Detect vertical scroll and automatically scroll.
    let toScroll = (this.scrollHeight - this.clientHeight) || 0, nextToScroll = toScroll;
    new MutationObserver(() => (
      this.#animating
        && (nextToScroll = (this.scrollHeight - this.clientHeight)) !== toScroll
        && this.scrollTop > toScroll - 40
        && (this.scrollTop = nextToScroll),
        toScroll = nextToScroll
    )).observe(this.#shadow, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  // If the attribute changes, sync with prop.
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    // Capture the content change.
    (
      name === "thinking"
      || this.hasAttribute("thinking")
      || name === "innerhtml"
      || name === "inner-html"
      || name === "textcontent"
      || name === "text-content"
      || name === "innertext"
      || name === "inner-text"
      || name === "value"
    ) && (
      this.innerHTML = this.content
    );
  }

  // Helper function to cancel animation.
  cancel() {
    this.#cancels.forEach(cancel => cancel());
    this.#cancels.clear();
    return this;
  }

  // Helper function to skip the animation.
  skipAnimation() {
    const delay = this.delay, ondone = this.ondone;
    this.delay = 0;
    this.ondone = (...args) => {
      this.delay = delay;
      ondone && ondone(...args);
      this.ondone = ondone;
    }
    this.clear();
    this.innerHTML = this.#currentContent;
    return this;
  }

  // Helper function to clear the content.
  clear() {
    this.cancel();
    !this.#shadow.childNodes.length || removeChildren(this.#shadow);
    return this;
  }
}

})(); // END OF ENCAPSULATION.

// Register component.
customElements.define("progressive-content", ProgressiveContent);

// Exports.
export default Object.freeze(Object.defineProperty(ProgressiveContent, "ProgressiveContent", {
  value: ProgressiveContent
}));