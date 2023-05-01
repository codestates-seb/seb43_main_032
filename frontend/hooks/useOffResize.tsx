import { Dispatch, SetStateAction, useEffect } from 'react';

export const useOffResize = (
  size: number,
  set: string,
  setEvent: Dispatch<SetStateAction<boolean>>
) => {
  const upOffMenu = () => {
    if (window.innerWidth > size) {
      setEvent(false);
    }
  };

  const downOffMenu = () => {
    if (window.innerWidth < size) {
      setEvent(false);
    }
  };

  useEffect(() => {
    if (set === 'up') {
      window.addEventListener('resize', upOffMenu);
    } else {
      window.addEventListener('resize', downOffMenu);
    }
    return () => {
      if (set === 'up') {
        window.removeEventListener('resize', upOffMenu);
      } else {
        window.removeEventListener('resize', downOffMenu);
      }
    };
  }, []);
};

