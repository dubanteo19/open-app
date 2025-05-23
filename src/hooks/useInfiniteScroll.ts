import { useEffect } from "react";

type UseInfiniteScrollOptions = {
  callback: () => void;
  hasMore?: boolean;
  isFetching: boolean;
};
export const useInfiniteScroll = (
  ref: React.RefObject<Element>,
  { isFetching, hasMore, callback }: UseInfiniteScrollOptions,
) => {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && hasMore) {
          callback();
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.unobserve(node);
  }, [callback, hasMore, isFetching, ref]);
};
