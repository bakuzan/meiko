export interface DialogProps {
  isOpen: boolean;
  name: string;
  isForm?: boolean;
  hasBackdrop?: boolean;
  hideCancel?: boolean;
  title?: string;
  actionText?: string;
  children: React.ReactNode | React.ReactNode[];
  onAction?: () => void;
  onCancel?: () => void;
}

declare const Dialog: React.SFC<DialogProps>;

export default Dialog;
