import { useCallback, useRef, useState } from 'react';
import { useMountedState } from './useMountedState';

export function useAsyncFn(fn, deps = [], initialState = { loading: false }) {
  const lastCallId = useRef(0);
  const [state, set] = useState(initialState);

  const isMounted = useMountedState();
  const reset = () => set(initialState);
  const callback = useCallback((...args) => {
    const callId = ++lastCallId.current;
    set((p) => ({ value: p.value, loading: true }));

    return fn(...args).then(
      (value) => {
        isMounted() &&
          callId === lastCallId.current &&
          set({ value, loading: false });

        return value;
      },
      (error) => {
        isMounted() &&
          callId === lastCallId.current &&
          set({ error, loading: false });

        return error;
      }
    );
  }, deps);

  return [state, callback, reset];
}
