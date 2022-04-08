import * as React from 'react';
import * as rrd from 'react-router-dom';
import createHistoryProxy from '../util/createHistoryProxy';

var spanProps = { id: '__connect_router_span_by_fantasticsoul__', style: { display: 'none', width: 0, height: 0 } };

var withRouter = rrd.withRouter;
if (!withRouter) {
  // v6 版本不再暴露 withRouter
  withRouter = (Component) => {
    const Wrapper = (props) => {
      const history = rrd.useHistory();
      return React.createElement(Component, { history, ...props });
    };

    return Wrapper;
  };
}


export default rrd.withRouter(
  class extends React.Component {
    constructor(props, context) {
      super(props, context);
      var history = props.history;
      var callUrlChangedOnInit = props.callUrlChangedOnInit === true;

      createHistoryProxy(history, callUrlChangedOnInit, props.onUrlChange);
      if (props.connected) {
        props.connected(history);
      }
    }
    render() {
      return this.props.children || React.createElement('span', spanProps);
    }
  }
);

