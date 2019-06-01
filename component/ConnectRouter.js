var react = require('react');
var rrd = require('react-router-dom');
var cc = require('concent');
var historyProxy = require('../history-proxy');
var ROUTER_MODULE = require('../constant').ROUTER_MODULE;

var spanProps = { id: '__connect_router_span_by_fantasticsoul__', style: { display: 'none', width: 0, height: 0 } };
var WAIT_REFS_UNSET = 300;
//比等待的时间多一点，比这个时间大的ref才是真正的需要触发$onUrlChanged，
//防止快速切换路由时，一个组件既触发了componentDidMount，又触发了$$onUrlChanged
var JUST_INIT_TIME_SPAN = WAIT_REFS_UNSET + 100;

var actions = ['PUSH', 'POP', 'REPLACE'];


module.exports = rrd.withRouter(
  class extends react.Component {
    constructor(props, context) {
      super(props, context);
    }
    componentDidMount() {
      var props = this.props;
      var history = props.history;
      historyProxy.setHistory(history);
      if (props.connected) {
        props.connected(history);
      }
      var callUrlChangedOnInit = props.callUrlChangedOnInit === true;

      history.listen((param, action) => {
        console.log(action)
        if (actions.includes(action)) {
          cc.setState(ROUTER_MODULE, param);
        }

        //给300毫秒延迟，
        //既让concent有足够时间把该卸载的组件卸掉
        //也让concent有足够的时间把改挂的组件全部挂上(对于那种初次挂的组件)
        setTimeout(function () {
          var refs = cc.getRefs();
          var now = Date.now();

          refs.forEach(ref => {
            try {
              //CcFragment的函数定义在ref.cc里
              var fn = ref.$$onUrlChanged || ref.cc.onUrlChanged;
              if (fn) {
                //onUrlChanged在组件初次挂载的时候也会执行
                if (callUrlChangedOnInit) {
                  fn.call(ref, param, action, history);
                  return
                }

                var initTime = ref.cc.ccState.initTime;
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
    render() {
      return this.props.children || react.createElement('span', spanProps);
    }
  }
);

