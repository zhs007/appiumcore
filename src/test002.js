const wdio = require('webdriverio');
const selector = require('./android/selector');

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

  const lsttxt = await selector.findByClass(client, 'android.widget.TextView');
  const jp = await selector.findWithText(lsttxt, '机票');
  if (jp) {
    await jp.click();

    const lsttjjp = await selector.findByID(
        client,
        'com.taobao.trip:id/stv_more'
    );
    if (lsttjjp.length > 0) {
      const tjjp = lsttjjp[0];
      await tjjp.click();

      // const lstclickable = await selector.findByClickable(client, true);
      // console.log(lstclickable.length);
      const lstview = await selector.findByID(
          client,
          'com.taobao.trip:id/weex_fragment_container'
      );
      if (lstview.length > 0) {
        const rootview = lstview[0];
        const lstclickable = await selector.findByClickable(rootview, true);
        // const html = await rootview.getHTML();
        // const lstwh = await selector.findByDesc(client, '武汉');
        console.log(lstclickable.length);
      }
      // // const lstview = await selector.findByClass(client, 'android.view.View');
      // for (let i = 0; i < lstview.length; ++i) {
      //   // const ct = await lstview[i].getText();
      //   // console.log(ct);
      // }
    }
  }

  // const mainviews = await selector.waitForID(
  //     client,
  //     'com.taobao.trip:id/home_frg_refresh_view',
  //     3 * 60
  // );
  // if (mainviews == undefined) {
  //   console.log('find home_frg_refresh_view timeout');
  // } else if (mainviews.length == 1) {
  //   const mainview = mainviews[0];
  //   const lsttxt = await selector.findByClass(
  //       mainview,
  //       'android.widget.TextView'
  //   );
  //   const jp = await selector.findWithText(lsttxt, '机票');
  //   if (jp) {
  //     await jp.click();
  //   }
  // }

  // await field.setValue('Hello World!');
  // const value = await field.getText();
  // assert.equal(value, 'Hello World!');

  // for (let i = 0; i < mainviews.length; ++i) {
  //   // const txt = await fields[i].getText();
  //   // console.log(txt);
  // }

  await client.deleteSession();
}

start(opts);
