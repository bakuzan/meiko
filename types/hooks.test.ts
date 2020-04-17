import { useRef } from 'react';

import {
  useAsync,
  useAsyncFn,
  useDebounce,
  useGlobalStyles,
  useIntersect,
  useMountedState,
  useOutsideClick,
  usePrevious,
  useProgressiveLoading,
  useScrollPosition,
  useWhyDidYouUpdate,
  useWindowSize
} from './index';

const asyncState = useAsync(async () => Promise.resolve());

const [asyncFnState, callback, reset] = useAsyncFn(async () =>
  Promise.resolve()
);

useDebounce<string>('test');
useDebounce<boolean>(true, 1000);

useGlobalStyles();

const ref = useRef<Element>();
ref.current = document.createElement('div');

useIntersect(ref);
useIntersect(ref, '50px');

useMountedState();

useOutsideClick(ref.current, () => null);

usePrevious<string>('test');
usePrevious<number>(12);

useProgressiveLoading(() => null);

useScrollPosition();

useWhyDidYouUpdate('Test', {});

useWindowSize();
