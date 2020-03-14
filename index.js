var ConnectRouter = require('./component/ConnectRouter');
var Link = require('./component/Link');
var historyProxy = require('./history-proxy');
var createHistoryProxy = require('./util/createHistoryProxy');
var confMod = require('./util/conf');
var cc = require('concent');
var cst = require('./constant');
// var ROUTER_MODULE= Symbol('');

var configureRoute = (config = {}) => {
  const moduleName = config.module || cst.ROUTER_MODULE;
  const evUrlChanged = config.onUrlChanged || cst.EV_URL_CHANGED;

  confMod.setModuleName(moduleName);
  confMod.setUrlChangeEvName(evUrlChanged);

  cc.configure(moduleName, {
    state: {
      hash: '',
      key: '',
      pathname: '',
      search: '',
      state: null,
    }
  });
  return {
    install: () => ({ name: moduleName })
  }
}

var toExport = module.exports = {};

toExport.ConnectRouter = ConnectRouter;
toExport.Link = Link;
toExport.history = historyProxy.getHistory();
toExport.createHistoryProxy = createHistoryProxy;
toExport.configureRoute = configureRoute;
toExport.getModuleName = confMod.getModuleName;
toExport.getUrlChangedEvName = confMod.getUrlChangedEvName;

toExport.default = toExport;