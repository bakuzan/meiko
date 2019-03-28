import { useEffect } from 'react';

import { KeyCodes } from '../_constants/enums';
import { createListeners } from '../_utils';

// TODO delete backdrop

export function useOutsideClick(
  element: Node,
  onOutsideClick: (e: Event) => void
) {
  useEffect(() => {
    if (!element) {
      return;
    }

    function handleClick(event: MouseEvent) {
      const isDescendantOfRoot = element.contains(event.target as Node);

      if (!isDescendantOfRoot) {
        onOutsideClick(event);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
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
  }, [element, onOutsideClick]);
}
