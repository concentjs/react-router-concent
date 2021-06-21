import * as React from 'react';
import * as historyProxy from '../history-proxy';

var history = historyProxy.getHistory();

export default function (props) {
  var style = props.style;
  var to = props.to;
  var onClick = props.onClick;
  var className = props.className;

  // set href =  "javascript:;" will receive
  // Warning: A future version of React will block javascript:
  var elProps = {
    className: className,
    href: "javascript:;",
    // href: "########", //block就block吧，本来里面就没逻辑，这样写到导致在线 IDE的内嵌浏览器里使用Link会重调转，刷新整个页面
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
  return React.createElement('a', elProps, props.children);
}