import _ConnectRouter from './component/ConnectRouter';
import _Link from './component/Link';
import * as _historyProxy from './history-proxy';
import _createHistoryProxy from './util/createHistoryProxy';
import * as _confMod from './util/conf';
import _cc from 'concent';
import * as _cst from './constant';
// var ROUTER_MODULE= Symbol('');

const _configureRoute = (config = {}) => {
  const moduleName = config.module || _cst.ROUTER_MODULE;
  const evUrlChanged = config.onUrlChanged || _cst.EV_URL_CHANGED;

  _confMod.setModuleName(moduleName);
  _confMod.setUrlChangeEvName(evUrlChanged);

  _cc.configure(moduleName, {
    state: {
      hash: '',
      key: '',
      pathname: '',
      search: '',
      state: null,
    }
  });
}

export const ConnectRouter = _ConnectRouter;
export const Link = _Link;
export const history = _historyProxy.getHistory();
export const createHistoryProxy = _createHistoryProxy;
export const configureRoute = _configureRoute;
export const getModuleName = _confMod.getModuleName;
export const getUrlChangedEvName = _confMod.getUrlChangedEvName;
export const getLatestCallInfo = _historyProxy.getLatestCallInfo;

export default {
  ConnectRouter,
  Link,
  history,
  createHistoryProxy,
  configureRoute,
  getModuleName,
  getUrlChangedEvName,
  getLatestCallInfo,
}
