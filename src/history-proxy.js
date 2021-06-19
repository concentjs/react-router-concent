
var history = null;
var slice = Array.prototype.slice;
var toString = Object.prototype.toString;

function _historyNotReady() {
  throw new Error('you may forget to initialize <ConnectRouter /> or call createHistoryProxy in your app!');
}

function isObject(val) {
  return toString.call(val) === '[object Object]'
}

// call by api
function _callHistoryMethod() {
  var args = slice.call(arguments);
  var method = args[0];
  // 用户透传的调用参数 arguments 伪数组，这里需提前转为真数组
  var inputArgs = slice.call(args[1]);

  // hash 路由不支持透传 state，不能如下方式
  // if (['push', 'replace'].includes(method)) {
  // var firstArg = inputArgs[0];
  // var secondArg = inputArgs[1];

  // // 扩展 state 值，表示来自于api调用
  // if (isObject(firstArg)) {
  //   if (isObject(firstArg.state)) {
  //     firstArg.state.callByApi = true;
  //   } else {
  //     firstArg.state = { callByApi: true };
  //   }
  // } else if (isObject(secondArg)) {
  //   secondArg.callByApi = true;
  // } else {
  //   inputArgs[1] = { callByApi: true };
  // }
  // }

  if (history) {
    latestInfo = { callByApi: true, callTime: Date.now() };
    history[method].apply(null, inputArgs);
  }
  else _historyNotReady();
}

let latestInfo = {
  callByApi: false,
  callTime: 0,
};
exports.getLatestCallInfo = function () {
  return latestInfo;
}

exports.clearLatestCallInfo = function () {
  latestInfo = { callByApi: false, callTime: 0 };
}

exports.setHistory = function (_history) {
  history = _history;
}

var cachedHistory = null;
exports.getHistory = function () {
  if (cachedHistory) return cachedHistory;

  var _history = {
    block: function () {
      _callHistoryMethod('block', arguments);
    },
    createHref: function () {
      _callHistoryMethod('createHref', arguments);
    },
    go: function () {
      _callHistoryMethod('go', arguments);
    },
    goBack: function () {
      _callHistoryMethod('goBack', arguments);
    },
    goForward: function () {
      _callHistoryMethod('goForward', arguments);
    },
    listen: function () {
      _callHistoryMethod('listen', arguments);
    },
    push: function () {
      _callHistoryMethod('push', arguments);
    },
    replace: function () {
      _callHistoryMethod('replace', arguments);
    },
    getRouterHistory: function () {
      return history;
    }
  };
  if (window && window.location) _history.location = window.location;

  cachedHistory = _history;
  if (window && !window.cc_history) window.cc_history = cachedHistory;
  return cachedHistory;
}
