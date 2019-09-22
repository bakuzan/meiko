import { EventCodes } from '../constants/enums';

function addListener(event, cb) {
  document.addEventListener(event, cb);
  return () => document.removeEventListener(event, cb);
}

export default function addOutsideClick(element, onOutsideClick) {
  function handleClick(event) {
    const isDescendantOfRoot = element.contains(event.target);

    if (!isDescendantOfRoot) {
      onOutsideClick(event);
    }
  }

  function handleKeyDown(event) {
    if (EventCodes.Escape === event.key) {
      onOutsideClick(event);
    }
  }

  const removeKeyDown = addListener('keydown', handleKeyDown);
  const removeClick = addListener('click', handleClick);

  return () => {
    removeKeyDown();
    removeClick();
  };
}
