import * as React from 'react';

export interface FormButtonProps extends React.HTMLProps<HTMLButtonElement> {
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
