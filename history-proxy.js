
var history = null;
var slice = Array.prototype.slice;

function _historyNotReady() {
  throw new Error('you may forget to initialize <ConnectRouter /> in your app!');
}

function _callHistoryMethod() {
  const args = slice.call(arguments);
  var method = args[0];
  var inputArgs = args[1];

  if (history) history[method].apply(null, slice.call(inputArgs));
  else _historyNotReady();
}

exports.setHistory = function (_history) {
  history = _history;
}

var cachedHistory = null;
exports.getHistory = function () {
  if (cachedHistory) return cachedHistory;

  var _history = {
    listen: function () {
      if (!history) _historyNotReady();
      return history.listen;
    },
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
  cachedHistory = _history;
  if (window && !window.cc_history) window.cc_history = cachedHistory;
  return cachedHistory;
}

