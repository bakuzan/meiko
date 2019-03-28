import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './RatingControl.scss';

class RatingControl extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    onChange: PropTypes.func
  };

  maximum = 10;
  iterator = [];
  isReadOnly = true;

  constructor(props) {
    super(props);

    this.maximum = 10;
    this.iterator = Array(this.maximum).fill(null);
    this.isReadOnly = !props.onChange;
  }

  componentDidUpdate() {
    this.isReadOnly = !this.props.onChange;
  }

  handleChange(event) {
    if (this.isReadOnly) {
      return;
    }

    const { value: valueString, type } = event.target;
    const value = Number(valueString);
    this.props.onChange({
      target: {
        value: this.props.value === value ? 0 : value,
        type,
        name: this.props.name
      }
    });
  }

  ratingColouriser(value) {
    if (value < 4) {
      return 'low';
    } else if (value < 7) {
      return 'average';
    } else if (value < 9) {
      return 'good';
    } else {
      return 'great';
    }
  }

  renderSelectors() {
    return this.iterator.map((item, index) => {
      const value = index + 1;
      const colourise = this.ratingColouriser(value);
      const hoverInfo = `${value}/${this.maximum}`;
      const radioId = `${this.props.id}-${value}`;
      return (
        <label
          key={index}
          htmlFor={radioId}
          className={classNames('rating-control-option', colourise, {
            past: this.props.value > value,
            selected: this.props.value === value
          })}
          title={hoverInfo}
        >
          <input
            type="radio"
            id={radioId}
            value={value}
            checked={value === this.props.value}
            onChange={() => null}
            onClick={(e) => this.handleChange(e)}
          />
        </label>
      );
    });
  }

  render() {
    const ratingSelectors = this.renderSelectors();

    return (
      <div
        className={classNames('rating-control', {
          'read-only': this.isReadOnly
        })}
        role="radiogroup"
      >
        {ratingSelectors}
        <label
          htmlFor={this.props.name}
          className={classNames('rating-control-label')}
        >
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default RatingControl;
