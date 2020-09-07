const helpers = require('./src/helpers.js');

const nwUtilssettings = {
  /**
   *
   * INTERNAL STATE
   *
   */
  // Your custom data to be saved or loaded
  data: undefined,
  // Wheter to log out error and helper messages
  logging: false,
  // Name of the file used when saving/loading
  fileName: undefined,
  // The default name for the file to save/load
  defaultFileName: 'app-settings.json',
  /**
   * Path to the file based on OS and user account specific App Data folder
   * with the file name joined at the end.
   *
   * @return {string}  The full file path
   */
  filePath: function () {
    const path = require('path');
    let fileName = this.fileName || this.defaultFileName;
    return path.join(nw.App.dataPath, fileName);
  },


  /**
   *
   * HELPER METHODS
   *
   */

  /**
   * Checks if the settings file exists
   *
   * @return {boolean}  True = file exists, False = file does not exist
   */
  settingsExist: function () {
    const fs = require('fs');
    if (fs.existsSync(this.filePath())) {
      return true;
    }
    if (this.logging) {
      console.info('No settings file found.');
    }
    return false;
  },
  /**
   * Applies any options that are passed in, or uses default values
   *
   * @param  {options} options  The passed in options from the API methods
   */
  applyOptions: function (options) {
    this.data = options.settings || undefined;
    this.logging = options.logging || false;
    this.fileName = options.fileName || this.defaultFileName;
  },


  /**
   *
   * PRIMARY FUNCTIONS
   *
   */
  /**
   * Asynchronously loads settings data
   *
   * @param  {Function}   callback  Ran after saving settings file finishes
   * @return {undefined}            Runs callback when done, passes in error message if error occurred.
   */
  save: function (callback) {
    if (this.settingsAreValid()) {
      const fs = require('fs');
      const settingsData = JSON.stringify(this.data, null, 2);
      fs.writeFile(this.filePath(), settingsData, function (err) {
        if (err && this.logging) {
          console.info('There was an error attempting to save the settings.');
          console.warn(err.message);
        }
        if (callback) {
          callback(err);
        }
      }.bind(this));
    }
  },
  /**
   * Synchronously saves settings
   *
   * @return {undefined} Returns undefined, or error if unsuccesful.
   */
  saveSync: function () {
    if (this.settingsAreValid()) {
      const fs = require('fs');
      const settingsData = JSON.stringify(this.data, null, 2);
      try {
        fs.writeFileSync(this.filePath(), settingsData);
      } catch (err) {
        if (err && this.logging) {
          console.info('There was an error attempting to save the settings.');
          console.warn(err.message);
        }
        return error;
      }
    }
  },
  /**
   * Asynchronously loads settings data
   *
   * @param  {Function} callback  Ran after data is retrieved/parsed if no error occurs
   * @return {object}             Return JSON of settings via callback or undefined if error occurs
   */
  load: function (callback) {
    if (this.settingsExist()) {
      const fs = require('fs');
      fs.readFile(this.filePath(), function (err, data) {
        if (err && this.logging) {
          console.info('There was an error reading the settings file');
          console.warn(err);
        }
        try {
          data = String(data);
          data = JSON.parse(data);
        } catch (parseError) {
          if (this.logging) {
            console.info('Error attempting to parse settings data');
            console.warn(parseError);
          }
          return;
        }
        if (callback) {
          callback(data);
        }
      }.bind(this));
    } else if (callback) {
      callback();
    }
  },
  /**
   * Synchronously load the settings data.
   *
   * @return {object}  Returns the settings JSON, or undefined if error occurs.
   */
  loadSync: function () {
    if (this.settingsExist()) {
      const fs = require('fs');
      try {
        let data = fs.readFileSync(this.filePath());
        try {
          data = String(data);
          data = JSON.parse(data);
        } catch (parseError) {
          if (this.logging) {
            console.info('Error attempting to parse settings data');
            console.warn(parseError);
          }
          return;
        }
        return data;
      } catch (err) {
        if (err && this.logging) {
          console.info('There was an error reading the settings file');
          console.warn(err);
        }
      }
    }
  },


  /**
   *
   * API METHODS
   *
   */
  /**
   * Applies settings and runs async save
   *
   * @param  {object}     options  The data, options and callback function for saving
   * @return {undefined}           Runs callback upon completion
   */
  saveSettingsAPI: function (options) {
    this.applyOptions(options);
    this.save(options.callback);
  },
  /**
   * Applies settings and runs synchronous save
   *
   * @param  {object}     options  The data, options and callback function for saving
   * @return {undefined}           Returns error if error occured or undefined if no error
   */
  saveSettingsAPISync: function (options) {
    this.applyOptions(options);
    return this.saveSync();
  },
  /**
   * Applies settings and asynchronously returns settings data from settigns file
   *
   * @param  {object}  options  The options and callback
   * @return {JSON}             Callback is ran on completion passing in an Array or Object, if an error occured callback ran with nothing passed in
   */
  loadSettingsAPI: function (options) {
    this.applyOptions(options);
    this.load(options.callback);
  },
  /**
   * Applies settings and synchronously returns settings data from settigns file
   *
   * @param  {object}  options  The data, options and callback function for saving
   * @return {JSON}             Returns Array or Object on completion or undefined if error occurred
   */
  loadSettingsSyncAPI: function (options) {
    this.applyOptions(options);
    return this.loadSync();
  }
};


const nwUtilsSettings = {
  save: function () {},
  saveSync: function () {},
  load: function () {},
  loadSync: function () {}
};


module.exports = nwUtilsSettings;

