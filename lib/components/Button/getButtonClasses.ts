import classNames from 'classnames';

export interface IButtonStyleProps {
  btnStyle?: string;
  btnSize?: string;
  link?: boolean;
  rounded?: boolean;
  depress?: boolean;
  icon?: string;
}

export function getButtonClasses({
  className,
  btnStyle,
  btnSize,
  link,
  rounded,
  depress,
  icon
}: IButtonStyleProps & { className?: string }) {
  const hasBtnStyle = !!btnStyle;
  const hasBtnSize = !!btnSize;
  const hasLink = !!link;
  const hasIcon = !!icon;
  return classNames(className, {
    button: !hasLink && !hasIcon,
    'button-link': hasLink,
    'button-icon': hasIcon,
    [btnStyle]: hasBtnStyle,
    [btnSize]: hasBtnSize,
    rounded,
    depress
  });
}
