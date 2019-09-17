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

declare function Alert(props: AlertProps): React.Component<AlertProps, any>;

export default Alert;
