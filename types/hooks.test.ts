import { useRef } from 'react';

import {
  useDebounce,
  useGlobalStyles,
  useIntersect,
  useOutsideClick,
  usePrevious,
  useProgressiveLoading,
  useScrollPosition,
  useWhyDidYouUpdate,
  useWindowSize
} from './index';

useDebounce<string>('test');
useDebounce<boolean>(true, 1000);

useGlobalStyles();

const ref = useRef<Element>();
ref.current = document.createElement('div');

useIntersect(ref);
useIntersect(ref, '50px');

useOutsideClick(ref.current, () => null);

usePrevious<string>('test');
usePrevious<number>(12);

useProgressiveLoading(() => null);

useScrollPosition();

useWhyDidYouUpdate('Test', {});

useWindowSize();
