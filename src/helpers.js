/**
 * Uses the DOM's console log if available, otherwise falls back to the background process.
 *
 * @return {Function}  console.log function
 */
function logger (message, options) {
  const log = options && options.log || global.win && global.win.console && global.win.console.log || console.log;
  log(message);
}
const title = 'nw-utils-settings';
const underscore = (new Array(title.length)).fill('_').join('');

const helpers = {
  /**
   * Ensures the settings to save are valid.
   * Can run custom validation if passed in.
   *
   * @param  {object}  appSettings  The data to be validated and saved
   * @param  {object}  options      Options that may contain a customValidation function
   * @return {boolean}              True = Valid, False = Invalid
   */
  settingsAreValid: function (appSettings, options) {
    let validity = true;

    if (options && typeof(options.customValidation) === 'function') {
      validity = options.customValidation(appSettings);
    }

    if (typeof(appSettings) !== 'object') {
      logger(title, options);
      logger(underscore, options);
      logger('App settings must be an Array or Object', options);
      validity = false;
    }

    return validity;
  },
};

module.exports = helpers;
