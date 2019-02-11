import styled from 'styles';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import * as col from 'styles/colours';
import * as vars from 'styles/variables';
import { theming } from './styles';
// import { styles, bgStyles, theming } from './styles';

interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
  btnStyle?: string;
  btnSize?: string;
  link?: boolean;
  rounded?: boolean;
  depress?: boolean;
  icon?: string;
}

const PlainButton: React.SFC<IButtonProps> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

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
      min-width: 100px;
      min-height: 25px;
      text-decoration: none;
    `}
  ${(props) =>
    props.link &&
    `
    color: ${vars.anchorColour},
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
${(props) => theming(props.btnStyle, props.theme)}
`;

Button.defaultProps = {
  type: 'button'
};

// Button.propTypes = {
//   type: PropTypes.string,
//   btnStyle: PropTypes.oneOf(['primary', 'accent']),
//   btnSize: PropTypes.oneOf(['small']),
//   rounded: PropTypes.bool,
//   depress: PropTypes.bool,
//   link: PropTypes.bool,
//   onClick: PropTypes.func
// };

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
