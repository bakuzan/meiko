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
    const renderCancel = !cancelOptions.hide;

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
            <Button type="submit" className="mko-form__submit">
              {submitOptions.text || Strings.save}
            </Button>
            {renderCancel && (
              <Button className="mko-form__cancel" onClick={this.handleCancel}>
                {Strings.cancel}
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
  submitOptions: PropTypes.object.isRequired,
  cancelOptions: PropTypes.object.isRequired
};

export default Form;
