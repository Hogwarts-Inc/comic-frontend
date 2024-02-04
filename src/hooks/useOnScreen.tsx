import { RefObject, useEffect, useMemo, useState } from 'react';

export default function useOnScreen(ref: RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(() => {
    try {
      return new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));
    } catch (e) {
      return null;
    }
  }, []);

  useEffect(() => {
    if (ref.current) observer?.observe(ref.current);
    return () => observer?.disconnect();
  }, [ref, observer]);

  return isIntersecting;
}
