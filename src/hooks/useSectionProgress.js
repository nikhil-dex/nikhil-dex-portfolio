import { useState, useEffect } from 'react';

// progress 0 = section ka top viewport mein ghusa
// progress 1 = section ka top viewport ke 25% pe pahuncha (tune-able)
export default function useSectionProgress(ref, endAt = 0.25) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh;              // top jab viewport bottom pe
      const end = vh * endAt;        // top jab viewport ke 25% pe
      const p = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref, endAt]);
  return progress;
}