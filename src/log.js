exports.configure = function(driver) {
  driver.on("status", function(info) {
    console.log(info);
  });
  driver.on("command", function(meth, path, data) {
    console.log(" > " + meth, path, data || "");
  });
  driver.on("http", function(meth, path, data) {
    console.log(" > " + meth, path, data || "");
  });
};
