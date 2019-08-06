var cc = require('concent');
var historyProxy = require('../history-proxy');
var ROUTER_MODULE = require('../constant').ROUTER_MODULE;

var WAIT_REFS_UNSET = 300;
//比等待的时间多一点，比这个时间大的ref才是真正的需要触发$onUrlChanged，
//防止快速切换路由时，一个组件既触发了componentDidMount，又触发了$$onUrlChanged
var JUST_INIT_TIME_SPAN = WAIT_REFS_UNSET + 100;

var actions = ['PUSH', 'POP', 'REPLACE'];
var initCount = 0;

module.exports = function createHistoryProxy(history, callUrlChangedOnInit) {
  var _callUrlChangedOnInit = callUrlChangedOnInit === true;
  if (initCount > 0) {
    console.warn('historyProxy already been created! you may init ConnectedRouter or call createHistoryProxy more than one time.');
    return;
  }

  initCount += 1;
  historyProxy.setHistory(history);

  history.listen((param, action) => {
    if (actions.includes(action)) {
      cc.setState(ROUTER_MODULE, param);
    }

    //给300毫秒延迟，
    //既让concent有足够时间把该卸载的组件卸掉
    //也让concent有足够的时间把改挂的组件全部挂上(对于那种初次挂的组件)
    //然后在去刷新对应的cc组件
    setTimeout(function () {
      var refs = cc.getRefs();
      var now = Date.now();

      refs.forEach(ref => {
        try {
          var fn = ref.ctx.aux.onUrlChanged;
          if (fn) {
            //onUrlChanged在组件初次挂载的时候也会执行
            if (_callUrlChangedOnInit) {
              fn.call(ref, param, action, history);
              return
            }

            var initTime = ref.ctx.initTime;
            //时间太短，是初次挂载上，忽略onUrlChanged
            if (now - initTime > JUST_INIT_TIME_SPAN) {
              fn.call(ref, param, action, history);
            }
          }
        } catch (err) {
          console.log(' ************ error occured ************ ');
          console.error(err);
        }
      });
    }, WAIT_REFS_UNSET);
  });
}
