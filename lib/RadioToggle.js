/* eslint jsx-a11y/click-events-have-key-events: "off" */
/* eslint jsx-a11y/no-static-element-interactions: "off" */

import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';

import Icons from './constants/icons';

import styles from './styles/RadioToggle';

const defaultIcons = [Icons.cross, Icons.tick];
function RadioToggle({ className, label, icons = defaultIcons, ...props }) {
  const ref = useRef();
  const [focused, setFocus] = useState(false);

  return (
    <div
      className={classNames(
        'radio-toggle',
        {
          'radio-toggle--checked': props.checked,
          'radio-toggle--focused': focused
        },
        styles.radioToggle,
        props.checked && styles.radioToggle_checked,
        focused && styles.radioToggle_focused,
        className
      )}
      onClick={(event) => {
        const checkbox = ref.current;
        const { target } = event;

        if (target !== checkbox) {
          event.preventDefault();
          checkbox.focus();
          checkbox.click();
        }
      }}
    >
      <div
        className={classNames(
          'radio-toggle__options',
          styles.radioToggle__options
        )}
      >
        <div
          className={classNames(
            'radio-toggle__option radio-toggle__checked',
            styles.radioToggle__option
          )}
        >
          {icons[0]}
        </div>
        <div
          className={classNames(
            'radio-toggle__option radio-toggle__unchecked',
            styles.radioToggle__option
          )}
        >
          {icons[1]}
        </div>
      </div>
      <div
        className={classNames(
          'radio-toggle__control',
          styles.radioToggle__control
        )}
      />
      <input
        {...props}
        ref={ref}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => {
          const { checked, name } = e.target;
          props.onChange(checked, name);
        }}
        className={classNames(
          'radio-toggle__for-screenreader',
          styles.radioToggle__forScreenReader
        )}
        type="checkbox"
        aria-label={label}
      />
    </div>
  );
}

RadioToggle.propTypes = {
  label: PropTypes.string.isRequired,
  icons: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired
};

export default RadioToggle;
