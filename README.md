# nw-utils-settings

Helper functions for NW.js to save/load your app's custom settings as a JSON file/object.


## API

```js
// Save - Asynchronous
nwUtilsSettings.save(appSettings, options, callback);

// Load - Asynchronous
nwUtilsSettings.load(options, callback);

// Save - Synchronous
const saved = nwUtilsSettings.saveSync(appSettings, options);

// Load - Synchronous
const settings = nwUtilsSettings.loadSync(options);

````

### Save Settings

```js
const nwUtilsSettings = require('nw-utils-settings');

// Any object or array that you want saved
const appSettings = {
  theme: 'dark',
  locale: 'en-us'
};

// completely optional, everything shown here is the defaults
const options = {
  fileName: 'settings.json',
  location: nw.App.dataPath,
  // a function you can supply to validate the app settings before saving them. Must return a boolean
  customValidation: function (appSettings) {
    return typeof(appSettings) === 'object';
  }
};

// SYNC
const saved = nwUtilsSettings.saveSync(appSettings, options);

if (saved) {
  console.log('saved settings');
} else {
  console.log('error saving settings');
}

// ASYNC
nwUtilsSettings.save(appSettings, options, function (saved) {
  if (saved) {
    console.log('saved settings');
  } else {
    console.log('error saving settings');
  }
});

```

### Load Settings

```js
// completely optional, everything shown here is the defaults
const options = {
  fileName: 'settings.json',
  location: nw.App.dataPath
};

// SYNC
const appSettings = nwUtilsSettings.loadSync(options);
if (appSettings) {
  console.log('The loaded settings are', appSettings);
} else {
  console.log('There was an error loading the settings');
}


// ASYNC
nwUtilsSettings.load(options, function (appSettings) {
  if (appSettings) {
    console.log('The loaded settings are', appSettings);
  } else {
    console.log('There was an error loading the settings');
  }
});
```
