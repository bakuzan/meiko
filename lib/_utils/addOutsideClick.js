import { KeyCodes } from '../_constants/enums';
import { createListeners } from '../_utils';

export default function addOutsideClick(element, onOutsideClick) {
  function handleClick(event) {
    const isDescendantOfRoot = element.contains(event.target);

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
  console.log('add');
  const clickCtrl = createListeners('click', handleClick)();
  clickCtrl.listen();

  return () => {
    console.log('remove');
    keyCtrl.remove();
    clickCtrl.remove();
  };
}
