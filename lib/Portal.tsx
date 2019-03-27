import * as PropTypes from 'prop-types';
import * as React from 'react';
import ReactDOM from 'react-dom';

interface IPortalProps {
  parentTag: string;
  querySelector: string;
}

class Portal extends React.Component<IPortalProps, any> {
  static propTypes = {
    parentTag: PropTypes.string,
    querySelector: PropTypes.string.isRequired
  };
  static defaultProps = {
    parentTag: 'div'
  };

  el = null;
  targetNode = null;

  constructor(props: IPortalProps) {
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
