const {sleep} = require('../utils');

/**
 * findByID
 * @param {object} obj - webdriverio element or client
 * @param {string} id - id
 */
async function findByID(obj, id) {
  const selector = 'new UiSelector().resourceId("' + id + '")';
  return await obj.$$(`android=${selector}`);
}

/**
 * findByID
 * @param {object} obj - webdriverio element or client
 * @param {bool} clickable - clickable
 */
async function findByClickable(obj, clickable) {
  const selector = 'new UiSelector().clickable(' + clickable + ')';
  return await obj.$$(`android=${selector}`);
}

/**
 * findByClass
 * @param {object} obj - webdriverio element or client
 * @param {string} className - className
 */
async function findByClass(obj, className) {
  const selector = 'new UiSelector().className("' + className + '")';
  return await obj.$$(`android=${selector}`);
}

/**
 * findByDesc
 * @param {object} obj - webdriverio element or client
 * @param {string} desc - description
 */
async function findByDesc(obj, desc) {
  const selector = 'new UiSelector().description("' + desc + '")';
  return await obj.$$(`android=${selector}`);
}

/**
 * findWithText
 * @param {array} lst - webdriverio elements
 * @param {string} txt - txt
 */
async function findWithText(lst, txt) {
  for (let i = 0; i < lst.length; ++i) {
    const ct = await lst[i].getText();
    if (ct == txt) {
      return lst[i];
    }
  }

  return undefined;
}

/**
 * findByID
 * @param {object} obj - webdriverio element or client
 * @param {string} id - id
 * @param {number} timeout - timeout in second
 */
async function waitForID(obj, id, timeout) {
  let ct = 0;
  while (true) {
    const lst = await findByID(obj, id);
    if (lst.length > 0) {
      return lst;
    }

    if (ct > timeout) {
      return undefined;
    }

    await sleep(1000);
    ct += 1;
  }
}

exports.findByID = findByID;
exports.findByClass = findByClass;
exports.findByDesc = findByDesc;
exports.findByClickable = findByClickable;

exports.findWithText = findWithText;

exports.waitForID = waitForID;
