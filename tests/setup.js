global.beforeEach(() => {
  global.nw = {
    App: {
      dataPath: 'C:/Users/DUMMY/AppData/Local/DUMMY_MOCK/User Data/Default'
    }
  };
});

global.afterEach(() => {
  jest.resetModules();
});

// Jest's setTimeout defaults to 5 seconds.
// Bump the timeout to 60 seconds.
jest.setTimeout(60 * 1000);
