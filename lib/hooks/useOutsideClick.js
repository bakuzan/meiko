import { useEffect } from 'react';

import addOutsideClick from '../utils/addOutsideClick';

export function useOutsideClick(element, onOutsideClick) {
  useEffect(() => {
    if (!element) {
      return;
    }

    const removeOnOutsideClick = addOutsideClick(element, onOutsideClick);
    return () => removeOnOutsideClick();
  }, [element, onOutsideClick]);
}
