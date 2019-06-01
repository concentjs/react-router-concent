var react = require('react');
var historyProxy = require('../history-proxy');

var history = historyProxy.getHistory();

module.exports = function (props) {
  var style = props.style;
  var to = props.to;
  var onClick = props.onClick;

  var elProps = {
    href: "javascript:;",
    onClick: function (e) {
      if(e.stopPropagation){
        if(props.stop === false){
          //do nothing
        }else{
          e.stopPropagation();
        }
      }
      history.push(to);
      if(onClick)onClick(to);
    },
    style
  };
  return react.createElement('a', elProps, props.children);
}