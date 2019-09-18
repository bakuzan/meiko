export interface AlertMessage {
  id: string | number;
  type: string;
  message: string;
  detail?: string;
}

export interface AlertProps extends React.HTMLProps<HTMLDivElement> {
  messageClassName?: string;
  alerts: AlertMessage[];
  actions: {
    dismissAlertMessage: (id: number | string) => void;
  };
}

declare const Alert: React.SFC<AlertProps>;

export default Alert;
