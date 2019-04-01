import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { findDOMNode } from 'react-dom';

import styles from './_styles/Logo';

class Logo extends React.Component {
  letterClass = 'logo__letter';
  letterClassFull = classNames(this.letterClass, styles.logo__letter);
  animate = 'logo__letter--hideshow';
  sideLength = 50;
  characters = null;
  interval = null;

  componentDidMount() {
    this.initLogo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.initLogo();
    }
  }

  initLogo() {
    const container = findDOMNode(this);
    this.characters = container.querySelectorAll(`text.${this.letterClass}`);
    this.cycleCharacters();
  }

  cycleCharacters() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      const letterIndex = Array.from(this.characters).findIndex((x) => {
        return x.getAttribute('class').indexOf(this.animate) > -1;
      });

      const nextLetterIndex =
        letterIndex + 1 < this.characters.length ? letterIndex + 1 : 0;

      if (letterIndex !== -1 && this.characters[letterIndex]) {
        this.characters[letterIndex].setAttribute(
          'class',
          this.letterClassFull
        );
      }

      const nextLetter = this.characters[nextLetterIndex];
      if (!nextLetter) {
        return;
      }

      nextLetter.setAttribute(
        'class',
        classNames(this.letterClassFull, this.animate)
      );
    }, 1500);
  }

  render() {
    const letters = this.props.text.toUpperCase().split('');
    return (
      <div
        id={this.props.id}
        className={classNames('logo', 'center-contents', styles.logo)}
      >
        <svg
          className={classNames('logo__svg', styles.logo__svg)}
          xmlns="http://www.w3.org/2000/svg"
        >
          {letters.map((item, index) => {
            return (
              <text
                key={index}
                className={this.letterClassFull}
                x="50%"
                y="50%"
                dy="0.3em"
              >
                {item}
              </text>
            );
          })}
          <text
            className={classNames(
              'logo__word',
              'logo__word--diagonal',
              styles.logo__word,
              styles.logo__word_diagonal
            )}
            x="50%"
            y="50%"
            dy="0.3em"
            textLength={this.sideLength}
            lengthAdjust="spacingAndGlyphs"
          >
            {this.props.text.toUpperCase()}
          </text>
        </svg>
      </div>
    );
  }
}

Logo.displayName = 'Logo';
Logo.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string.isRequired
};

export default Logo;
