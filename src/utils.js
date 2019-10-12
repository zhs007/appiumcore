/**
 * sleep
 * @param {number} ms - ms
 * @return {Promise} result -
 */
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

exports.sleep = sleep;
