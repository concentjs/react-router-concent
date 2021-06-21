import * as cst from '../constant';
var moduleName = cst.ROUTER_MODULE;
var evUrlChanged = cst.EV_URL_CHANGED;
export const setModuleName = function (name) {
  moduleName = name;
};
export const getModuleName = function () {
  return moduleName;
};
export const setUrlChangeEvName = function (evName) {
  evUrlChanged = evName;
};
export const getUrlChangedEvName = function () {
  return evUrlChanged;
};