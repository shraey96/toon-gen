import { useEffect } from "react";

interface UseKeydownProps {
  key: string;
  callback: () => void;
  enabled?: boolean;
}

export function useKeydown({ key, callback, enabled = true }: UseKeydownProps) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === key) {
        callback();
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [key, callback, enabled]);
}
