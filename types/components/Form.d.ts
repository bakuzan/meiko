import * as React from 'react';
import { ButtonProps } from './Button';

export interface FormButtonProps extends ButtonProps {
  text?: string;
  hide?: boolean;
}

export interface FormProps {
  name: string;
  title?: string;
  children: React.ReactNode | React.ReactNode[];
  submitOptions?: FormButtonProps & {
    onSubmit: () => void;
  };
  cancelOptions?: FormButtonProps & {
    onCancel: () => void;
  };
}

declare class Form extends React.Component<FormProps, any> {}

export default Form;
