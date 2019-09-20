export interface RequestIndicatorProps {
  hide?: boolean;
  requestInFlight?: boolean;
}

declare const RequestIndicator: React.SFC<RequestIndicatorProps>;

export default RequestIndicator;
