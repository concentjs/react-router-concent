var ROUTER_MODULE = require('../constant').ROUTER_MODULE;

var moduleName = ROUTER_MODULE;

exports.setModuleName = function (name) {
  moduleName = name;
}

exports.getModuleName = function () {
  return moduleName;
}