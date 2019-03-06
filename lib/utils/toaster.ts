const INFO = 'INFO';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
const WARNING = 'WARNING';

export interface IToast {
  time?: number;
  type: string;
  title: string;
  message: string;
}
export interface IToaster {
  popToast(toast: IToast): void;
}

class ToasterService {
  private toaster: IToaster;

  register(instance: IToaster) {
    this.toaster = instance;
  }

  popToast(newToast: IToast) {
    if (!this.toaster) {
      return;
    }

    this.toaster.popToast({
      time: Date.now(),
      type: INFO,
      title: 'Just so your aware',
      message: 'This is the default toast text!',
      ...newToast
    });
  }

  info(title: string, message: string) {
    this.popToast({ type: INFO, title, message });
  }
  success(title: string, message: string) {
    this.popToast({ type: SUCCESS, title, message });
  }
  error(title: string, message: string) {
    this.popToast({ type: ERROR, title, message });
  }
  warning(title: string, message: string) {
    this.popToast({ type: WARNING, title, message });
  }
}

const toaster = new ToasterService();
export default toaster;
