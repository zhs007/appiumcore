const wdio = require('webdriverio');

const opts = {
  host: 'localhost',
  port: 4723,
  capabilities: {
    platformName: 'Android',
    appPackage: 'com.taobao.trip',
    appActivity: '.home.HomeActivity',
    deviceName: 'OnePlus3T',
    platformVersion: '9.0',
    udid: 'c104c463',
    noReset: true,
    // automationName: 'UiAutomator2',
  },
};

/**
 * start
 * @param {object} cfg - {host, port}
 */
async function start(cfg) {
  const client = await wdio.remote(cfg);

  const selector =
    'new UiSelector().resourceId("com.taobao.trip:id/home_frg_refresh_view")';
  const fields = await client.$$(`android=${selector}`);
  // await field.setValue('Hello World!');
  // const value = await field.getText();
  // assert.equal(value, 'Hello World!');

  for (let i = 0; i < fields.length; ++i) {
    // const txt = await fields[i].getText();
    // console.log(txt);
  }

  await client.deleteSession();
}

start(opts);
