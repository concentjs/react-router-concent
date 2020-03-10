var react = require('react');
var rrd = require('react-router-dom');
var createHistoryProxy = require('../util/createHistoryProxy');

var spanProps = { id: '__connect_router_span_by_fantasticsoul__', style: { display: 'none', width: 0, height: 0 } };

module.exports = rrd.withRouter(
  class extends react.Component {
    constructor(props, context) {
      super(props, context);
      var props = this.props;
      var history = props.history;
      var callUrlChangedOnInit = props.callUrlChangedOnInit === true;

      createHistoryProxy(history, callUrlChangedOnInit);
      if (props.connected) {
        props.connected(history);
      }
    }
    render() {
      return this.props.children || react.createElement('span', spanProps);
    }
  }
);

