import { useEffect, useRef } from 'react';

export const useHideOnClickOutside = (
  setVisibility: (value: boolean) => void,
) => {
  const ref = useRef(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !(ref.current as any).contains(event.target)) {
      setVisibility(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { ref };
};
