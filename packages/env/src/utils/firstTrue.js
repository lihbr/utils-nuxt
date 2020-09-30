/**
 * Get first element evaluating to true otherwise the last one
 * @param  {...any} options - options to loop through
 * @return {any} - element found
 */
const firstTrue = (...options) =>
  options.find(i => i) || options[options.length - 1];

module.exports = firstTrue;
