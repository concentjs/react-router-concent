import * as React from 'react';
import * as rrd from 'react-router-dom';
import createHistoryProxy from '../util/createHistoryProxy';

var spanProps = { id: '__connect_router_span_by_fantasticsoul__', style: { display: 'none', width: 0, height: 0 } };

export default rrd.withRouter(
  class extends React.Component {
    constructor(props, context) {
      super(props, context);
      var history = props.history;
      var callUrlChangedOnInit = props.callUrlChangedOnInit === true;

      createHistoryProxy(history, callUrlChangedOnInit);
      if (props.connected) {
        props.connected(history);
      }
    }
    render() {
      return this.props.children || React.createElement('span', spanProps);
    }
  }
);

