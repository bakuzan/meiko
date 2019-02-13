import classNames from 'classnames';
import * as React from 'react';

import { getButtonClasses, IButtonStyleProps } from './getButtonClasses';
import styled from '../../styles';
import * as col from '../../styles/colours';
import * as vars from '../../styles/variables';
import ripple from '../../styles/ripple';

export interface IButtonProps
  extends IButtonStyleProps,
    React.HTMLProps<HTMLButtonElement> {}

const PlainButton: React.SFC<IButtonProps> = ({
  children,
  link,
  rounded,
  depress,
  btnSize,
  btnStyle,
  ...props
}) => {
  const classes = getButtonClasses({
    ...props,
    link,
    rounded,
    depress,
    btnSize,
    btnStyle
  });

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
};

export const Button = styled(PlainButton)`
    appearance: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: inherit;
    color: inherit;
    padding: 5px;
    border: none;
    white-space: nowrap;
    cursor: pointer;

    :disabled {
      background-color: ${col.grey80} !important;
      color: ${col.grey40} !important;
      cursor: default;
    }

    ${(props) => props.rounded && 'border-radius: 5px;'}
    ${(props) =>
      props.depress &&
      `
        boxShadow: 0 0 5px ${col.onyx};
        :active {
          boxShadow: inset 0px 0px 5px ${col.onyx};
        }
      }
    `}

    ${(props) =>
      !props.icon &&
      !props.link &&
      `
      ${ripple}
      min-width: 100px;
      min-height: 25px;
      text-decoration: none;
    `}
  ${(props) =>
    props.link &&
    `
    color: ${vars.anchorColour};
    text-decoration: underline;
    :focus,
    :active {
      color: ${vars.anchorColour};
    }
    :hover {
      color: ${vars.anchorColourHover};
    }
  `}
  ${(props) =>
    props.icon &&
    `
    flex: 0 1 0%;
    padding: 3px 6px;
    margin: 2px 5px;
    textDecoration: none;

    ::before {
      content: attr(icon);
      font-size: 1.5rem;
      :not(:disabled) {
        cursor: pointer;
      }
    }
  `}
${(props) =>
  props.btnSize === 'small' &&
  `
    ::before {
      font-size: 0.8rem;
    }
`}
`;

Button.defaultProps = {
  type: 'button'
};

export function withButtonisation(WrappedComponent: React.SFC<IButtonProps>) {
  return Button.withComponent(WrappedComponent);
}

export function withCustomButtonWrapper(
  WrappedComponent,
  { className: customClass, ...customProps }
) {
  return ({ className, ...props }: IButtonProps) => {
    return (
      <WrappedComponent
        {...props}
        className={classNames(customClass, className)}
        {...customProps}
      />
    );
  };
}

interface IButtonGroupProps {
  className?: string;
  centered?: boolean;
  right?: boolean;
  children: React.ReactNode;
}

const PlainButtonGroup: React.SFC<IButtonGroupProps> = (props) => (
  <div className={props.className}>{props.children}</div>
);

export const ButtonGroup = styled(PlainButtonGroup)`
  display: flex;
  justify-content: ${(props) =>
    props.centered ? 'center' : props.right ? 'flex-end' : 'space-around'};
  align-items: center;
  padding: 5px;
  margin: 5px 0;
`;
