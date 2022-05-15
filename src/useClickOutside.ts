import { useEffect, useRef } from "react";

export const useClickOutside = <E extends HTMLElement = HTMLElement>(
  onClickOutside: (() => void) | undefined
) => {
  const ref = useRef<E | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node | null)) {
        onClickOutside?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside, ref]);

  return ref;
};
