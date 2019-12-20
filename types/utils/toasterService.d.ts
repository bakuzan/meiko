import { ComponentClass } from 'react';

export interface Toast {
  type: 'INFO' | 'SUCCESS' | 'ERROR' | 'WARNING';
  title: string;
  message: string;
}

export interface ToasterInstantiator {
  popToast: (toast: Toast & { time: number }) => void;
}

export declare class ToasterService {
  register(instance: ToasterInstantiator): void;

  popToast(newToast: Toast): void;

  info(title: string, message: string): void;
  success(title: string, message: string): void;
  error(title: string, message: string): void;
  warning(title: string, message: string): void;
}

declare const toaster: ToasterService;

export default toaster;
