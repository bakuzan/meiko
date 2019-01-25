import * as col from 'styles/colours';
import { anchorColour, anchorColourHover } from 'styles/variables';

export const bgStyles = {
  ButtonGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '5px',
    margin: '5px 0'
  },
  ButtonGroupCentered: {
    justifyContent: 'center'
  },
  ButtonGroupRightAligned: {
    justifyContent: 'flex-end'
  }
};

export const styles = {
  ButtonBase: {
    appearance: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'inherit',
    color: 'inherit',
    padding: '5px',
    border: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    ':disabled': {
      backgroundColor: `${col.grey80} !important`,
      color: `${col.grey40} !important`,
      cursor: 'default'
    }
  },
  Rounded: {
    borderRadius: '5px'
  },
  Depressed: {
    boxShadow: `0 0 5px ${col.onyx}`,
    ':active': {
      boxShadow: `inset 0px 0px 5px ${col.onyx}`
    }
  },

  Button: {
    minWidth: '100px',
    minHeight: '25px',
    textDecoration: 'none'
  },

  ButtonLink: {
    color: anchorColour,
    textDecoration: 'underline',
    ':focus': {
      color: anchorColour
    },
    ':active': {
      color: anchorColour
    },
    ':hover': {
      color: anchorColourHover
    }
  },

  ButtonIcon: {
    flex: '0 1 0%',
    padding: '3px 6px',
    margin: '2px 5px',
    textDecoration: 'none',

    ':before': {
      content: 'attr(icon)',
      fontSize: '1.5rem',
      ':not(:disabled)': {
        cursor: 'pointer'
      }
    }
  },
  ButtonIconSmall: {
    ':before': {
      fontSize: '0.8rem'
    }
  }
};

function getThemeStyles(backgroundColor, color, backgroundColorHovered) {
  return {
    backgroundColor,
    color,
    ':hover': {
      backgroundColor: backgroundColorHovered
    }
  };
}

interface IButtonTheme {
  primaryBackgroundColour: string;
  primaryColour: string;
  primaryBackgroundColourHover: string;
  accentBackgroundColour?: string;
  accentColour?: string;
  accentBackgroundColourHover?: string;
  backgroundColour: string;
  colour: string;
  backgroundColourHover: string;
}

export function theming(btnStyle: string, theme: IButtonTheme) {
  console.log('theme ?', theme);
  if (btnStyle === 'primary') {
    return getThemeStyles(
      theme.primaryBackgroundColour,
      theme.primaryColour,
      theme.primaryBackgroundColourHover
    );
  } else if (btnStyle === 'accent') {
    return getThemeStyles(
      theme.accentBackgroundColour,
      theme.accentColour,
      theme.accentBackgroundColourHover
    );
  } else {
    return getThemeStyles(
      theme.backgroundColour,
      theme.colour,
      theme.backgroundColourHover
    );
  }
}
