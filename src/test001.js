const wd = require("wd");
const { configure } = require("./log");

const serverConfig = {
  host: "localhost",
  port: 4723
};

function start(cfg) {
  let driver = wd.promiseChainRemote(cfg);
  configure(driver);

  var desired = {
    platformName: "Android",
    appPackage: "com.taobao.trip",
    appActivity: ".home.HomeActivity",
    deviceName: "OnePlus3T",
    platformVersion: "9.0",
    udid: "c104c463",
    noReset: true
  };

  driver.init(desired).setImplicitWaitTimeout(8000);
}

start(serverConfig);