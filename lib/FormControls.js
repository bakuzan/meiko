import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import CI from './ClearableInput';
import SB from './SelectBox';
import resolveErrorMessage from './utils/resolveErrorMessage';

import styles from './styles/FormControls';

function ErrorBlock({ className, children, ...props }) {
  return (
    <div className={classNames('error-block', className)} {...props}>
      {children}
    </div>
  );
}

function withErrorMessage(Component) {
  function FormControl({ className, error, value, ...props }) {
    const errorMessage = resolveErrorMessage(error, props.name);
    const hasError = !!errorMessage;

    return (
      <div className={classNames('form-control', className)}>
        <Component {...props} value={value || ''} />
        {hasError && (
          <ErrorBlock
            className={classNames(
              'form-control__error',
              styles.formControl__error
            )}
          >
            {errorMessage}
          </ErrorBlock>
        )}
      </div>
    );
  }

  FormControl.displayName = `FormControl(${Component.displayName})`;
  FormControl.propTypes = {
    name: PropTypes.string.isRequired,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.instanceOf(Map)
    ])
  };

  return FormControl;
}

const ClearableInput = withErrorMessage(CI);
const SelectBox = withErrorMessage(SB);

export default {
  ErrorBlock,
  ClearableInput,
  SelectBox
};
