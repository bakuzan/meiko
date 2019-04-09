import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { Button } from './Button';
import Strings from './constants/strings';

import styles from './styles/Form';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel() {
    const { onCancel } = this.props.cancelOptions;
    onCancel && onCancel();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitOptions.onSubmit();
  }

  render() {
    const {
      className,
      name,
      title,
      submitOptions,
      cancelOptions,
      children,
      ...props
    } = this.props;

    const hasTitle = !!title;
    const {
      text: submitText,
      hide: hideSubmit,
      onSubmit,
      ...submitBtnProps
    } = submitOptions;
    const {
      text: cancelText,
      hide: hideCancel,
      onCancel,
      ...cancelBtnProps
    } = cancelOptions;
    const renderCancel = !hideCancel;
    const renderSubmit = !hideSubmit;

    return (
      <div className={classNames('mko-form', className)} {...props}>
        {hasTitle && <h4 className="mko-form__title">{title}</h4>}
        <form
          name={name}
          className={classNames('mko-form__form', styles.form)}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          {children}
          <div className={classNames('button-group')}>
            {renderSubmit && (
              <Button
                {...submitBtnProps}
                type="submit"
                className={classNames(
                  'mko-form__submit',
                  submitBtnProps.className
                )}
              >
                {submitText || Strings.save}
              </Button>
            )}
            {renderCancel && (
              <Button
                {...cancelBtnProps}
                className={classNames(
                  'mko-form__cancel',
                  cancelBtnProps.className
                )}
                onClick={this.handleCancel}
              >
                {cancelText || Strings.cancel}
              </Button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

Form.displayName = 'Form';
Form.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  submitOptions: PropTypes.shape({
    onSubmit: PropTypes.func
  }).isRequired,
  cancelOptions: PropTypes.shape({ onCancel: PropTypes.func }).isRequired
};

export default Form;
