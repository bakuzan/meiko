import * as React from 'react';

export interface LoadableContentProps {
  isFetching: boolean;
  spinnerSize?: string;
  spinnerDelay?: number;
}

declare class LoadableContent extends React.Component<
  LoadableContentProps,
  any
> {}

export default LoadableContent;
