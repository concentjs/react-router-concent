var ConnectRouter = require('./component/ConnectRouter');
var Link = require('./component/Link');
var historyProxy = require('./history-proxy');
var createHistoryProxy = require('./util/createHistoryProxy');
var cc = require('concent');
var ROUTER_MODULE = require('./constant').ROUTER_MODULE;
// var ROUTER_MODULE= Symbol('');

var isCcAlreadyStartup = cc.ccContext.isCcAlreadyStartup;
if (isCcAlreadyStartup === false) {
  cc.ccContext.isCcAlreadyStartup = true;
}
cc.configure(ROUTER_MODULE, {
  state: {
    hash: '',
    key: '',
    pathname: '',
    search: '',
    state: null,
  }
});
if (isCcAlreadyStartup === false) {
  cc.ccContext.isCcAlreadyStartup = false;
}

const toExport = module.exports = {};

toExport.ROUTER_MODULE = ROUTER_MODULE;
toExport.ConnectRouter = ConnectRouter;
toExport.Link = Link;
toExport.history = historyProxy.getHistory();
toExport.createHistoryProxy = createHistoryProxy;

toExport.default = toExport;