import { useState, useLayoutEffect } from 'react';

import getWindowScrollPosition from '../utils/getWindowScrollPosition';

export function useScrollPosition() {
  const [position, setPosition] = useState(0);

  useLayoutEffect(() => {
    function handleScroll() {
      const value = getWindowScrollPosition();
      if (value !== position) {
        setPosition((p) => (value === p ? p : value));
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [position]);

  return position;
}
