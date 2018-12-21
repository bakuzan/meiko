import * as PropTypes from 'prop-types';
import * as React from 'react';
import ReactDOM from 'react-dom';

class Portal extends React.Component {
  static propTypes = {
    parentTag: PropTypes.string,
    querySelector: PropTypes.string.isRequired
  };
  static defaultProps = {
    parentTag: 'div'
  };

  el = null;
  targetNode = null;

  constructor(props) {
    super(props);

    this.el = document.createElement(props.parentTag);
    this.targetNode = document.querySelector(props.querySelector);
  }

  componentDidMount() {
    this.targetNode.appendChild(this.el);
  }

  componentWillUnmount() {
    this.targetNode.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Portal;
