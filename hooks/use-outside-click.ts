import { useEffect, RefObject } from "react";

interface UseOutsideClickProps<T extends HTMLElement> {
  ref: RefObject<T>;
  callback: () => void;
  enabled?: boolean;
}

export function useOutsideClick<T extends HTMLElement>({
  ref,
  callback,
  enabled = true,
}: UseOutsideClickProps<T>) {
  useEffect(() => {
    if (!enabled) return;

    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, enabled]);
}
