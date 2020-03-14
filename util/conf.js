var cst = require('../constant');

var moduleName = cst.ROUTER_MODULE;
var evUrlChanged = cst.EV_URL_CHANGED;

exports.setModuleName = function (name) {
  moduleName = name;
}

exports.getModuleName = function () {
  return moduleName;
}

exports.setUrlChangeEvName = function (evName) {
  evUrlChanged = evName;
}

exports.getUrlChangedEvName = function () {
  return evUrlChanged;
}