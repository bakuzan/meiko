import { KeyCodes } from '../constants/enums';
import { createListeners } from '../utils';

function addListener(event, cb) {
  document.addEventListener(event, cb);
  return () => document.removeEventListener(event, cb);
}

export default function addOutsideClick(element, onOutsideClick) {
  function handleClick(event) {
    const isDescendantOfRoot = element.contains(event.target);

    console.log(
      'CLICK IS ',
      `%c ${isDescendantOfRoot ? 'INSIDE' : 'OUTSIDE'}`,
      'color: purple; font-size: 18px'
    );

    if (!isDescendantOfRoot) {
      onOutsideClick(event);
    }
  }

  function handleKeyDown(event) {
    if (KeyCodes.escape === event.keyCode) {
      onOutsideClick(event);
    }
  }

  const removeKeyDown = addListener('keydown', handleKeyDown);
  const removeClick = addListener('click', handleClick);
  console.log('creates listeners');

  return () => {
    removeKeyDown();
    removeClick();
  };
}
