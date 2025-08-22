"use strict";

import "./functionUtilities";

// Tranform input url into a string.
export const urlstring = url => {
  url || (url = "");
  try {
    if (url instanceof URL) url = url.hostname;
  } catch {}
  return `${url}`.toLowerCase().replace(/\s+/g, "");
}

// Get the url without the protocol or the www.
export const urladdress = url => (
  urlstring(url).replace(/^(https|http|ftp)\:\/\/(www\.|)/i, "")
);

// Get the url host.
export const urlhost = url => (
  (url = urladdress(url)).slice(0, Math.max(url.indexOf("/") || 0, 0))
);

// Get the url basename, including subnet
export const urlbasename = url => (
  (url = urlhost(url)).slice(0, Math.max(url.lastIndexOf(".") || 0, 0))
)

// Get the url name, without the subnet
export const urlname = url => urlbasename(url).split(".").reverse().join(" ");

// Get the url page name.
export const urlpage = url => (
  (url = urladdress(url)).slice(
    Math.max(url.indexOf("/") || 0, 0),
    Math.min(
      Math.max(url.indexOf("?") || 0, 0),
      Math.max(url.indexOf("#") || 0, 0)
    ) || url.length
  )
);

// Get the url port.
export const urlport = url => (
  urlstring(url).split(/\?|\#/)[0].split(/:([0-9]+)/)[1]
);

// Get the url anchor.
export const urlanchor = url => (
  urlstring(url).split("?")[0].split("#")[1]
);

// Get url protocol.
export const urlprotocol = url => (
  urlstring(url).split("://")[0]
);

// Get url params.
export const urlparams = (url, decode) => (
  (urlstring(url).split("?")[1] || "")
    .split("&")
    .filter(Function.exists)
    .map(x => {
      const out = (decode && decodeURI(x) || x).split("=");
      out[1] || (out[1] = x.includes("=") ? "" : true);
      return out;
    })
);

// Get domain type.
export const urldomaintype = url => (
  url = (urlstring(url).split(/\:[0-9]|\#|\?/)[0].split(".").pop() || "").split(/\/|\:/)[0],
  /[a-z]+/.test(url) && url || undefined
);

// Get username.
export const urlusername = url => (
  url = urlstring(url).split("://").pop().split("@"),
  url.length > 1 && (
    url[0].split(":")[0]
  ) || undefined
);

// Get password.
export const urlpassword = url => (
  url = urlstring(url).split("://").pop().split("@"),
  url.length > 1 && (
    url[0].split(":")[1]
  ) || undefined
);

/**
 * Utility function to parse a url, outside what the URL class can do.
 *  
 * @param {string} url - Url to be parsed
 * @param {boolean} [decode=false] - If true, url parameters will be uri decoded
 * 
 * @returns {object} the output parsed url object.
 */
export const parseUrl = (url, decode) => ({
  string: urlstring(url),
  address: urladdress(url),
  host: urlhost(url),
  basename: urlbasename(url),
  name: urlname(url),
  page: urlpage(url),
  port: urlport(url),
  anchor: urlanchor(url),
  protocol: urlprotocol(url),
  params: urlparams(url, decode),
  username: urlusername(url),
  password: urlpassword(url)
});

// Exports.
parseUrl.urlstring = urlstring;
parseUrl.urladdress = urladdress;
parseUrl.urlhost = urlhost;
parseUrl.urlbasename = urlbasename;
parseUrl.urlname = urlname;
parseUrl.urlpage = urlpage;
export default Object.freeze(Object.defineProperty(parseUrl, "parseUrl", {
  value: parseUrl
}));