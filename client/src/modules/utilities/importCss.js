"use strict";

export const importCss = async path => await import(path, {
  with: { type: "css" }
}).default;

importCss.fetch = async path => {
  const response = await fetch(path),
    cssText = await response.text(),
    stylesheet = new CSSStyleSheet();
  await stylesheet.replace(cssText);
  return stylesheet;
}

// Exports.
export default Object.freeze(Object.defineProperty(importCss, "importCss", {
  value: importCss
}));