import {
  useLayoutEffect,
  useEffect,
  useRef,
  useCallback,
  RefObject,
} from "react";

interface UseAutoScrollResult<T extends HTMLElement> {
  ref: RefObject<T>;
  handleNewContent: () => void;
  scrollToBottom: (instant?: boolean) => void;
  isUserAtBottom: boolean;
}

export function useAutoScroll<
  T extends HTMLElement = HTMLDivElement,
>(): UseAutoScrollResult<T> {
  const containerRef = useRef<T | null>(null);
  const isUserAtBottomRef = useRef(true);
  const isMounted = useRef(false);

  const checkIsAtBottom = useCallback(() => {
    const el = containerRef.current;
    if (!el) return true;
    const { scrollTop, scrollHeight, clientHeight } = el;
    return scrollTop + clientHeight >= scrollHeight - 10;
  }, []);

  const scrollToBottom = useCallback((instant: boolean = false) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: instant ? "auto" : "smooth",
    });
  }, []);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    isUserAtBottomRef.current = checkIsAtBottom();
  };

  // Scroll ngay lần render đầu tiên
  useLayoutEffect(() => {
    scrollToBottom(true);
    isMounted.current = true;
  }, [scrollToBottom]);

  // Thêm listener scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [checkIsAtBottom]);

  const handleNewContent = () => {
    if (isUserAtBottomRef.current) {
      scrollToBottom(false); // Smooth scroll nếu đang ở cuối
    }
  };

  return {
    ref: containerRef,
    handleNewContent,
    scrollToBottom,
    isUserAtBottom: isUserAtBottomRef.current,
  };
}
