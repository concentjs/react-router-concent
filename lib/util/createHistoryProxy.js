import * as cc from 'concent';
import * as historyProxy from '../history-proxy';
import * as confMod from './conf';
var WAIT_REFS_UNSET = 300;
var CALL_TO_LISTEN_TIME_SPAN = 300; //比等待的时间多一点，比这个时间大的ref才是真正的需要触发$onUrlChanged，
//防止快速切换路由时，一个组件既触发了componentDidMount，又触发了$$onUrlChanged

var JUST_INIT_TIME_SPAN = WAIT_REFS_UNSET + 100;
var actions = ['PUSH', 'POP', 'REPLACE'];
var initCount = 0;
let insId = 1;
let validInsId;

function getInsId() {
  insId++;
  return insId;
}

export default function createHistoryProxy(history, callUrlChangedOnInit) {
  if (!history.__insId) {
    history.__insId = getInsId();
    validInsId = history.__insId;
  }

  var _callUrlChangedOnInit = callUrlChangedOnInit === true;

  if (initCount > 0) {
    //非hotReload 模式才不允许重复设置history，要不然会导致stackblitz里热加载后，使用history.push的操作失效
    if (!cc.ccContext.isHotReloadMode()) {
      // throw new Error('historyProxy already been created! you can not init ConnectedRouter or call createHistoryProxy more than one time.');
      console.warn('historyProxy already been created! you can not init ConnectedRouter or call createHistoryProxy more than one time.');
      return;
    }
  }

  initCount += 1;
  historyProxy.setHistory(history);
  history.listen((param, action) => {
    // 防止CodeSandbox热加载模式下，多个history实例同时监听都有效
    // 只能让最新的一个history的监听起效
    if (history.__insId !== validInsId) return;
    var modName = confMod.getModuleName();
    var urlChangedEvName = confMod.getUrlChangedEvName();
    var callInfo = historyProxy.getLatestCallInfo();

    if (Date.now() - callInfo.time > CALL_TO_LISTEN_TIME_SPAN) {
      historyProxy.clearLatestCallInfo();
    }

    if (actions.includes(action)) {
      var state = cc.getState(modName);

      if (!state) {
        console.warn(`forget to call configRouterModule after cc.run, react-router-concent will ignore writing the changed state`);
      } else {
        cc.setState(modName, param);
      }
    } //给300毫秒延迟，
    //既让concent有足够时间把该卸载的组件卸掉
    //也让concent有足够的时间把改挂的组件全部挂上(对于那种初次挂的组件)
    //然后在去刷新对应的cc组件


    setTimeout(function () {
      //onUrlChanged在组件初次挂载的时候也会执行
      if (_callUrlChangedOnInit) {
        cc.emit(urlChangedEvName, param, action, history);
        return;
      }

      var now = Date.now();
      cc.emit({
        name: urlChangedEvName,
        canPerform: ref => {
          var initTime = ref.ctx.initTime;
          return now - initTime > JUST_INIT_TIME_SPAN; //true: 可以执行
          //false: 时间太短，是初次挂载上，忽略onUrlChanged
        }
      }, param, action, history);
    }, WAIT_REFS_UNSET);
  });
}