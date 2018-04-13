import React from 'react';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import LoadingBouncer from './Loading-bouncer/LoadingBouncer';


export const SimpleLoading = props => props.pastDelay && <LoadingBouncer />;

export function Loading(props) {
  if (props.error) return <div>An Error was encountered loading the page!</div>;
  if (props.timedOut) return <div>The request has timed out!</div>;
  if (props.pastDelay) return <LoadingSpinner size="fullscreen" />;
  return null;
}
