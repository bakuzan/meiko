import { useEffect, useRef } from 'react';

import { EventCodes } from '../constants/enums';

export function useFocusShortcut(shortcutCode = EventCodes.KeyS) {
  const ref = useRef();

  useEffect(() => {
    function listenShortcut(event) {
      if (event.key === shortcutCode) {
        const element = ref.current;

        if (element) {
          requestAnimationFrame(() => element.focus());
        }
      }
    }

    window.addEventListener('keypress', listenShortcut);
    return () => window.removeEventListener('keypress', listenShortcut);
  }, [ref, shortcutCode]);

  return ref;
}
