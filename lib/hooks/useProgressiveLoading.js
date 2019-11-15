import { useEffect, useRef } from 'react';

function setItemOnScreenWatch(targetNode, callback, rootMargin = '0px') {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry && entry.isIntersecting && callback) {
        callback();
      }
    },
    {
      rootMargin
    }
  );

  if (targetNode) {
    observer.observe(targetNode);
  }

  return observer;
}

export function useProgressiveLoading(onIntersect) {
  const ref = useRef();

  const refChildren = ref && ref.current && ref.current.children;
  const refChildCount = refChildren ? refChildren.length : 0;
  const idx = refChildCount - 1;
  const lastChild = refChildren ? refChildren[idx] : undefined;

  useEffect(() => {
    let itemObserver = null;

    if (lastChild) {
      itemObserver = setItemOnScreenWatch(lastChild, onIntersect, '50px');
    }

    return () => {
      itemObserver && itemObserver.disconnect();
    };
  }, [lastChild, onIntersect]);

  return ref;
}
