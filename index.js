var ConnectRouter = require('./component/ConnectRouter');
var Link = require('./component/Link');
var historyProxy = require('./history-proxy');
var createHistoryProxy = require('./util/createHistoryProxy');
var moduleNameMod = require('./util/module-name');
var cc = require('concent');
var ROUTER_MODULE = require('./constant').ROUTER_MODULE;
// var ROUTER_MODULE= Symbol('');

var isConfigureCalled = false;

var configRouterModule = (moduleName = ROUTER_MODULE) => {
  isConfigureCalled = true;

  moduleNameMod.setModuleName(moduleName);
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

toExport.ROUTER_MODULE = ROUTER_MODULE;
toExport.ConnectRouter = ConnectRouter;
toExport.Link = Link;
toExport.history = historyProxy.getHistory();
toExport.createHistoryProxy = createHistoryProxy;
toExport.configRouterModule = configRouterModule;
toExport.getDefaultRouterPlugin = () => {
  if (isConfigureCalled) {
    throw new Error(`it seems you have called configRouterModule, you must use its return result as routerPlugin`);
  }

  return {
    install: () => ({ name: ROUTER_MODULE })
  }
};

toExport.default = toExport;