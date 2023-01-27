import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (
  fetchFunction: () => void,
  options?: IntersectionObserverInit,
) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const observerCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) => {
    entries.forEach((entrie) => {
      if (entrie.isIntersecting) fetchFunction();
    });
  };

  useEffect(() => {
    if (!triggerRef.current) return;
    const observer = new IntersectionObserver(observerCallback, options);
    observer.observe(triggerRef.current);

    return () => observer.disconnect();
  }, [triggerRef.current]);

  return triggerRef;
};
