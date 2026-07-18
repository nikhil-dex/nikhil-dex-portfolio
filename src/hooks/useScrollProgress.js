import { useState, useEffect } from 'react';

export default function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const scrolled = -el.getBoundingClientRect().top;
      const total = el.offsetHeight - window.innerHeight;
      // setProgress(Math.min(1, Math.max(0, scrolled / total)));
    const rawProgress = Math.min(1, Math.max(0, scrolled / total));

setProgress(Math.min(rawProgress / 0.777, 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);
  return progress;
}