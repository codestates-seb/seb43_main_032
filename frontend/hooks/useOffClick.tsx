import { useEffect, useRef, useState } from 'react';

export const useOffClick = <T extends HTMLElement>(initialState: boolean) => {
  const [state, setState] = useState(initialState);

  const ref = useRef<T>(null);

  useEffect(() => {
    const offClick = (e: MouseEvent) => {
      const target = e.target;
      if (state && ref.current && !ref.current.contains(target as Node)) {
        setState(false);
      }
    };
    document.addEventListener('click', offClick);
    return () => {
      document.removeEventListener('click', offClick);
    };
  }, [ref, state]);

  return [state, setState, ref] as const;
};
