import { KeyCodes } from '../constants/enums';
import { createListeners } from '../utils';

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

  const keyCtrl = createListeners('keydown', handleKeyDown)();
  keyCtrl.listen();

  const clickCtrl = createListeners('click', handleClick)();
  clickCtrl.listen();

  return () => {
    keyCtrl.remove();
    clickCtrl.remove();
  };
}
