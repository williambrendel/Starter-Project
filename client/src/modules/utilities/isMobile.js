"use strict";

const USER_AGENT = navigator.userAgent || navigator.vendor || window.opera || "";
export const isIOS = userAgent => /iP(hone|ad|od)/i.test(userAgent || USER_AGENT);
export const isAndroid = userAgent => /Android/i.test(userAgent || USER_AGENT);
export const isBlackBerry = userAgent => /BlackBerry/i.test(userAgent || USER_AGENT);
export const isOperaMobile = userAgent => /Opera Mini/i.test(userAgent || USER_AGENT);
export const isWindowsMobile = userAgent => /IEMobile|Windows Phone|WPDesktop/i.test(userAgent || USER_AGENT);
export const isOtherMobile = userAgent => /webOS/i.test(userAgent || USER_AGENT);

/**
 * Utility function to check if the device is a mobile device like a phone or a tablet.
 * 
 * @param {string} [userAgent=navigator.userAgent] - Input user agent to be analyzed in order to check if the device is a mobile device.
 * 
 * @returns {boolean} true if the device is a mobile device, false (or empty string if not user agent exists) otherwise.
 */
export const isMobile = userAgent => (
  (userAgent || (userAgent = USER_AGENT)) && (
    isIOS(userAgent)
    || isAndroid(userAgent)
    || isBlackBerry(userAgent)
    || isOperaMobile(userAgent)
    || isWindowsMobile(userAgent)
    || isOtherMobile(userAgent)
  )
);

// Exports.
isMobile.userAgent = USER_AGENT;
isMobile.isIOS = isIOS;
isMobile.isAndroid = isAndroid;
isMobile.isBlackBerry = isBlackBerry;
isMobile.isOperaMobile = isOperaMobile;
isMobile.isWindowsMobile = isWindowsMobile;
isMobile.isOtherMobile = isOtherMobile;
export default Object.freeze(Object.defineProperty(isMobile, "isMobile", {
  value: isMobile
}));