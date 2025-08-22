"use strict";

// Helper functions.
const emptyString = () => "",
  getStyle = s => (console.getStyle || emptyString)(s);

/**
 * Format a log, error, etc message.
 * 
 * Use the functions formatError, formatWarning, formatInfo, formatSuccess, formatLog for specialized input argument prefix and color.
 * 
 * @param {string} text - Text message
 * @param {string} [where=""] - Specify the file or function where the message is triggered, optional
 * @param {string} [prefix=""] - Specify the message type, optional
 * @param {string} [color="white"] - Specify the message color in the console, optional
 * 
 * @returns {string} the output message, formated for the console.
 */
const formatMessage = (text, where = "", prefix = "", color = "white", _color = getStyle(color)) => (
	`${getStyle("reset")}${getStyle("bright")}${_color}${prefix}${where && (` ${prefix && "i" || "I"}n ` + where) || ""}${(prefix || where) && ": " || ""}${getStyle("reset")}${_color}${text}${getStyle("reset")}`
);

// Exports.
formatMessage.formatError = (text, where) => formatMessage(text, where, "\n⛔️ ERROR", "red");
formatMessage.formatWarning = (text, where) => formatMessage(text, where, "\n⚠️  WARNING", "yellow");
formatMessage.formatInfo = (text, where) => formatMessage(text, where, "ℹ️ INFO", "cyan");
formatMessage.formatSuccess = (text, where) => formatMessage(text, where, "✅ SUCCESS", "green");
formatMessage.formatLog = (text, where) => formatMessage(text, where, "", "white");

export default Object.freeze(Object.defineProperty(formatMessage, "formatMessage", {
  value: formatMessage
}));