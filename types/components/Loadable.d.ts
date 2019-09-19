export interface SimpleLoadingProps {
  pastDelay?: boolean;
}

declare const SimpleLoading: React.SFC<SimpleLoadingProps>;

export interface LoadingProps {
  error?: Error;
  timedOut?: boolean;
  pastDelay?: boolean;
}

declare const Loading: React.SFC<LoadingProps>;

export { SimpleLoading, Loading };
