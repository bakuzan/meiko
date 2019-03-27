import * as PropTypes from 'prop-types';
import * as React from 'react';

import LoadingSpinner from './LoadingSpinner';

interface ILoadableContentProps {
  isFetching: boolean;
  spinnerSize: string;
  spinnerDelay: number;
}
interface ILoadableContentState {
  pastDelay: boolean;
}

class LoadableContent extends React.Component<
  ILoadableContentProps,
  ILoadableContentState
> {
  static defaultProps = {
    spinnerSize: 'fullscreen',
    spinnerDelay: 1100
  };

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    spinnerSize: PropTypes.string,
    spinnerDelay: PropTypes.number
  };

  private timer = null;

  constructor(props: ILoadableContentProps) {
    super(props);
    this.state = {
      pastDelay: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.isFetching && !prevProps.isFetching) {
      return this.handleDelayTimer();
    }

    if (!this.props.isFetching && prevProps.isFetching) {
      clearTimeout(this.timer);
      this.setState({ pastDelay: false });
    }
  }

  handleDelayTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(
      () => this.setState({ pastDelay: true }),
      this.props.spinnerDelay
    );
  }

  render() {
    if (this.props.isFetching && this.state.pastDelay) {
      return <LoadingSpinner size={this.props.spinnerSize} />;
    }

    return this.props.children;
  }
}

export default LoadableContent;
