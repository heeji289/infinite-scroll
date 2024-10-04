import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (
  isLoading: boolean,
  isEnd: boolean,
  setPageNum: React.Dispatch<React.SetStateAction<number>>
) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading && !isEnd) {
      setPageNum((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback);
    const currentElem = loadMoreRef.current;

    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [observerCallback]);

  return {
    loadMoreRef,
  };
};
