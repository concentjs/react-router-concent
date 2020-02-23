var ConnectRouter = require('./component/ConnectRouter');
var Link = require('./component/Link');
var historyProxy = require('./history-proxy');
var createHistoryProxy = require('./util/createHistoryProxy');
var cc = require('concent');
var ROUTER_MODULE = require('./constant').ROUTER_MODULE;
// var ROUTER_MODULE= Symbol('');


var configRouterModule = (moduleName = ROUTER_MODULE) => {
  cc.configure(moduleName, {
    state: {
      hash: '',
      key: '',
      pathname: '',
      search: '',
      state: null,
    }
  });
}

var toExport = module.exports = {};

toExport.ROUTER_MODULE = ROUTER_MODULE;
toExport.ConnectRouter = ConnectRouter;
toExport.Link = Link;
toExport.history = historyProxy.getHistory();
toExport.createHistoryProxy = createHistoryProxy;
toExport.configRouterModule = configRouterModule;

toExport.default = toExport;