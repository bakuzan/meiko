import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import './Tickbox.scss';

const Tickbox = ({ className, name, checked, disabled, onChange, text }) => (
  <div className={classNames('input-container', className)}>
    <label className={classNames('tickbox')} htmlFor={name}>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      {text}
    </label>
  </div>
);

Tickbox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  text: PropTypes.string
};

export default Tickbox;
