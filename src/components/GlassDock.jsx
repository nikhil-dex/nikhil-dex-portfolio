
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
// === SOCIAL ICONS DATA ===
const socials = [
  {
    label: 'GitHub',
    color: '#181717',
    href: 'https://github.com/nikhil-dex',
    peek: {x:0 , y:-12},
    svg: (
      <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    color: '#0A66C2',
    href: 'https://linkedin.com/in/nikhil-b203a2242',
    peek: {x:-12 , y:0},
    svg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z"/>
      </svg>
    ),
  },
  {
    label: 'X',
    color: '#000000',
    href: 'https://x.com/drip_nikhil',
    peek: {x:0 , y:12},
    svg: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
        <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41z"/>
      </svg>
    ),
  },
  {
    label: 'Reddit',
    color: '#FF4500',
    href: 'https://reddit.com/user/nikhil-web',
    peek: {x:12 , y:0},
    svg: (
      <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.01 4.74c.69 0 1.25.56 1.25 1.25a1.25 1.25 0 0 1-2.5.06l-2.6-.55-.8 3.75c1.83.07 3.48.63 4.68 1.49.3-.31.73-.5 1.2-.5.97 0 1.76.79 1.76 1.76 0 .72-.43 1.33-1.01 1.61.03.17.04.34.04.52 0 2.7-3.13 4.87-7 4.87s-7-2.17-7-4.87c0-.18.01-.36.04-.53-.61-.27-1.04-.89-1.04-1.6 0-.97.79-1.76 1.76-1.76.47 0 .9.19 1.2.5 1.19-.85 2.84-1.41 4.66-1.49l.89-4.19c.02-.08.06-.15.13-.2.07-.04.15-.06.23-.04l2.92.62c.2-.4.61-.68 1.09-.68zM9.25 12a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm5.5 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm-5.47 3.99c-.17.17-.17.44 0 .61.9.9 2.62.97 3.22.97.6 0 2.32-.07 3.22-.97.17-.17.17-.44 0-.61a.43.43 0 0 0-.61 0c-.57.57-1.78.77-2.61.77s-2.04-.2-2.61-.77a.43.43 0 0 0-.61 0z"/>
      </svg>
    ),
  },
];

export default function GlassDock() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);   // step 1: peek
  const [expanded, setExpanded] = useState(false); // step 2: spread
const [isTouch, setIsTouch] = useState(false);

useEffect(() => {
  setIsTouch(window.matchMedia('(hover: none)').matches);
}, []);
const peeking = hovered || isTouch;
  useEffect(() => {
    const onScroll = () => {
      const heroEnd = window.innerHeight * 4.5 * 0.75;
      const show = window.scrollY > heroEnd;
      setVisible(show);
      if (!show) { setExpanded(false); setHovered(false); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-1000 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      <motion.div
      drag
      dragConstraints={{ left: -200, right: 200 ,top: 0, bottom: 0}}
        className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/25 shadow-lg"
        style={{
          background: 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      >
        {/* === PROFILE + STACKED ICONS === */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => !isTouch && setHovered(true)}
          onMouseLeave={() => !isTouch && !expanded && setHovered(false)}
        >
          {/* profile — click = toggle spread */}
          <button
            onClick={() => setExpanded(e => !e)}
            className="relative z-40 rounded-full focus:outline-none"
            aria-label="Toggle socials"
          >
            <img
  src="/profile.jpg"
  alt="Nikhil"
  className={`rounded-full object-cover transition-all duration-300 ${
    peeking && !expanded ? 'w-6 h-6' : 'w-8 h-8'
  }`}
/>
          </button>

          {/* social icons — stacked behind profile, spread on expand */}
          {socials.map((s, i) => {
            // peek state: har icon thoda-thoda right, profile ke peeche
        
            // expanded state: full spread
            const spreadX = (i + 1) * 42;  //42

            return (
              <a
key={s.label}
  href={s.href}
  target="_blank"
  rel="noreferrer"
  aria-label={s.label}
  className="absolute left-0 top-1/2 rounded-full flex items-center justify-center transition-all duration-300 ease-out"
  style={{
    backgroundColor: isTouch ? s.color : '#171717',   // mobile: brand color, desktop: B&W
    width: expanded ? 32 : peeking ? 24 : 20,
    height: expanded ? 32 : peeking ? 24 : 20,
    transform: expanded

          ? `translateY(-50%) translateX(${spreadX}px)`

: peeking

? `translate(${s.peek.x}px, calc(-50% + ${s.peek.y}px))`

: `translateY(-50%) translateX(4px)`,
    zIndex: 30 - i,
    opacity: peeking || expanded ? 1 : 0,
    pointerEvents: expanded ? 'auto' : 'none',
  }}
  onMouseEnter={e => { if (!isTouch) e.currentTarget.style.backgroundColor = s.color; }}
  onMouseLeave={e => { if (!isTouch) e.currentTarget.style.backgroundColor = '#171717'; }}
>
  {s.svg}
</a>
            );
          })}

          {/* spacer — expanded mein icons ke liye jagah */}
          <div
            className="transition-all duration-300 ease-out"
            style={{ width: expanded ? socials.length * 42 + 8 : 10 }}
          />
        </div>
          
        <span className="text-neutral-400 mx-1">·</span>
        <a
          href="mailto:jincossec@gmail.com"
          className="text-sm text-neutral-700 hover:text-neutral-900 whitespace-nowrap transition-colors"
        >
          Speak to me
        </a>
      </motion.div>
    </div>
  );
}