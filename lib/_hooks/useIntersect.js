import React, { useRef } from 'react';

export function useIntersect(imgRef) {
  const isIntersecting = useRef(false);
  const hasRef = !!imgRef.current;

  React.useEffect(() => {
    if (!hasRef) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry], ob) => {
        if (entry && entry.isIntersecting) {
          isIntersecting.current = true;
          ob.disconnect();
        }
      },
      {
        rootMargin: '50px 0px'
      }
    );

    observer.observe(imgRef.current);

    return () => observer && observer.disconnect();
  }, [hasRef]);

  return isIntersecting.current;
}
