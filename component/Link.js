var react = require('react');
var historyProxy = require('../history-proxy');

var history = historyProxy.getHistory();

module.exports = function (props) {
  var style = props.style;
  var to = props.to;
  var onClick = props.onClick;
  var className = props.className;

  // set href =  "javascript:;" will receive
  // Warning: A future version of React will block javascript:
  var elProps = {
    className: className,
    // href: "javascript:;",
    href: "########",
    onClick: function (e) {
      if (e.stopPropagation) {
        if (props.stop === false) {
          //do nothing
        } else {
          e.stopPropagation();
        }
      }
      history.push(to);
      if (onClick) onClick(to);
    },
    style
  };
  return react.createElement('a', elProps, props.children);
}