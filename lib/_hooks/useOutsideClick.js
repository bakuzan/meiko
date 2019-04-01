import { useEffect } from 'react';

import addOutsideClick from '../_utils/addOutsideClick';

export function useOutsideClick(element, onOutsideClick) {
  useEffect(() => {
    if (!element) {
      return;
    }

    const removeOnOutsideClick = addOutsideClick(element, onOutsideClick);
    return () => removeOnOutsideClick();
  }, [element, onOutsideClick]);
}
