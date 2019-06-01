
var history = null;

function _historyNotReady() {
  throw new Error('you may forget to initialize <ConnectRouter /> in your app!');
}

function _callHistoryMethod() {
  const args = Array.prototype.slice.call(arguments);
  var method = args[0];
  var inputArgs = args[1];

  if (history) history[method].apply(null, Array.prototype.slice.call(inputArgs));
  else _historyNotReady();
}

exports.setHistory = function (_history) {
  history = _history;
}

exports.getHistory = function () {
  return {
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
}
