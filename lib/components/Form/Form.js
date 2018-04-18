import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React, { Component } from 'react';

import Button from 'components/Button/Button';
import Strings from 'constants/strings';

import styles from './Form.scss';

const cx = classNames.bind(styles);

class Form extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel() {
    this.props.cancelOptions.onCancel();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submitOptions.onSubmit();
  }

  render() {
    const {
      id,
      className,
      name,
      title,
      submitOptions,
      cancelOptions
    } = this.props;
    const hasTitle = !!title;
    const renderCancel = !cancelOptions.hide;

    return (
      <div id={id} className={cx('form-container', className)}>
        {hasTitle && <h4 className="form-title">{title}</h4>}
        <form
          name={name}
          className={cx('form')}
          noValidate=""
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          {this.props.children}
          <div className={cx('button-group')}>
            <Button type="submit" className="ripple">
              {submitOptions.text || Strings.save}
            </Button>
            {renderCancel && (
              <Button className="ripple" onClick={this.handleCancel}>
                {Strings.cancel}
              </Button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  submitOptions: PropTypes.object,
  cancelOptions: PropTypes.object
};

export default Form;
