/**
 * GlitchNavbar (plain React) — retro CRT glitch header nav (airDeck style)
 *
 * Framework-free version: works in Vite / CRA / any React app.
 * No next/link or next/navigation — uses <a> by default, and you can
 * inject react-router's Link via the `linkComponent` prop:
 *
 *   import { NavLink } from "react-router-dom";
 *   <GlitchNavbar linkComponent={NavLink} ... />
 *
 * Effect, same as the "Retro glitchy navigation with GSAP" CodePen:
 *   - hover  : text glitch-slides to center (RoughEase displacement burst)
 *   - active : side fill bars grow + looping random glitch bursts
 *   - CRT scanline pattern scrolls + flickers while hovered
 *   - desktop: horizontal row / mobile: hamburger + stacked menu
 *
 * Setup:
 *   1. npm i gsap
 *   2. Load the "Kode Mono" font (link below, or next/font)
 *   3. <GlitchNavbar items={[{ label: "Home", href: "/" }, ...]} />
 *
 * Font (put in index.html <head>):
 *   <link href="https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400..700&display=swap" rel="stylesheet" />
 */

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { RoughEase } from "gsap/EasePack";

gsap.registerPlugin(RoughEase);

const COLORS = {
  bg: "#0f0b0b",
  red: "#f55a6b",
  blue: "#5accf5",
  scan: "#221314",
  scanHot: "#521d20",
};

const rand = (min, max) => Math.random() * (max - min) + min;

/* ---------------- single nav item ---------------- */

function GlitchNavItem({ label, href, isActive, onActivate, as: LinkComp = "a" }) {
  const id = useId().replace(/:/g, "");
  const anchorRef = useRef(null);
  const tls = useRef(null); // timelines

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const svg = anchor.querySelector("svg");
    const red = anchor.querySelector("text.gnav-red");
    const blue = anchor.querySelector("text.gnav-blue");
    const displace = anchor.querySelector(".gnav-displace");
    const scanline = anchor.querySelector(".gnav-scanline");
    const scanPattern = anchor.querySelector(".gnav-scan-pattern");
    const fills = anchor.querySelectorAll(".gnav-fill");

    const startX = Number(red.getAttribute("x"));
    const centerX = (svg.viewBox.baseVal.width - red.getBBox().width) / 2 - startX;

    const easeIn = reduced
      ? "power2.out"
      : RoughEase.ease.config({ strength: 5, points: 10 });
    const duration = 0.3;
    const tween = { ease: easeIn, duration };

    const tl = (opts = {}) => gsap.timeline({ paused: true, ...opts });

    const t = {
      text: tl(),
      active: tl(),
      scanline: tl(),
      scanPattern: tl(),
      displacement: tl(),
      displacementActive: tl({ repeat: -1, repeatDelay: 2, repeatRefresh: true }),
    };

    t.text.to(red, { x: centerX, ...tween });
    t.text.to(blue, { x: centerX, ...tween }, "0.1");

    if (!reduced) {
      t.displacement
        .to(displace, { attr: { scale: () => rand(0.08, 2) }, ease: easeIn, duration })
        .to(displace, { attr: { scale: 0 }, ease: easeIn, duration: 0.3 }, duration);

      t.displacementActive
        .to(displace, { attr: { scale: () => rand(0.08, 0.4) }, ease: easeIn, duration: 0.5 })
        .to(displace, {
          attr: { scale: 0 },
          ease: easeIn,
          duration: () => rand(0.05, 0.1),
          onRepeat: () => {
            t.displacementActive.getChildren()[1].duration(rand(0.05, 0.1));
          },
        });

      t.scanline.to(scanline, { fill: COLORS.scanHot, ...tween }, 0);
      t.scanline.to(scanline, { opacity: 0.3, ease: easeIn, duration: 0.1, repeat: -1 }, 0);
      t.scanPattern.to(scanPattern, { attr: { y: 10 }, duration: 0.65, ease: "none", repeat: -1 });
    }

    t.active.to(fills[1], { attr: { height: 50 }, ...tween });
    t.active.to(fills[0], { attr: { height: 50 }, ...tween }, "<0.04");

    tls.current = t;
    return () => Object.values(t).forEach((x) => x.kill());
  }, []);

  const enter = () => {
    const t = tls.current;
    if (!t) return;
    t.text.timeScale(1).play();
    t.displacement.timeScale(1).play();
    t.scanline.timeScale(1).play();
    t.scanPattern.timeScale(1).play();
  };

  const leave = (force = false) => {
    const t = tls.current;
    if (!t || (isActive && !force)) return;
    t.text.timeScale(2).reverse();
    t.displacement.timeScale(2).reverse();
    t.displacementActive.pause(0);
    t.scanline.pause(0);
    t.scanPattern.pause(0);
    t.active.timeScale(1).reverse();
  };

  // active state driven by parent (route match or click)
  useEffect(() => {
    const t = tls.current;
    if (!t) return;
    if (isActive) {
      t.text.timeScale(1).play();
      t.active.timeScale(1).play();
      t.displacementActive.timeScale(1).play();
    } else {
      leave(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const bands = Array.from({ length: 20 });

  return (
    <LinkComp
      ref={anchorRef}
      href={LinkComp === "a" ? href : undefined}
      to={LinkComp !== "a" ? href : undefined}
      className="gnav-item"
      aria-current={isActive ? "page" : undefined}
      onMouseEnter={enter}
      onMouseLeave={() => leave()}
      onFocus={enter}
      onBlur={() => leave()}
      onClick={onActivate}
    >
      <svg viewBox="0 0 220 50" role="presentation" focusable="false">
        <defs>
          <filter
            id={`${id}-displace`}
            primitiveUnits="objectBoundingBox"
            colorInterpolationFilters="sRGB"
          >
            {bands.map((_, i) => (
              <feFlood
                key={i}
                floodColor={i % 2 === 0 ? "#8888FF" : "#888800"}
                y={`${i * 5}%`}
                height="5%"
                result={`s${i}`}
              />
            ))}
            <feMerge result="bands">
              {bands.map((_, i) => (
                <feMergeNode key={i} in={`s${i}`} />
              ))}
            </feMerge>
            <feDisplacementMap
              className="gnav-displace"
              in="SourceGraphic"
              in2="bands"
              scale="0"
              xChannelSelector="B"
              yChannelSelector="R"
            />
          </filter>

          <pattern
            id={`${id}-scan`}
            className="gnav-scan-pattern"
            patternUnits="userSpaceOnUse"
            width="5"
            height="10"
          >
            <rect className="gnav-scanline" x="0" y="0" width="5" height="1" fill={COLORS.scan} />
            <rect x="0" y="1" width="5" height="9" fill={COLORS.bg} />
          </pattern>

          <radialGradient
            id={`${id}-fade`}
            gradientUnits="userSpaceOnUse"
            cx="110"
            cy="25"
            r="40"
            gradientTransform="translate(110 25) scale(3 1) translate(-110 -25)"
          >
            <stop offset="0%" stopColor={COLORS.bg} stopOpacity="0" />
            <stop offset="60%" stopColor={COLORS.bg} stopOpacity="0" />
            <stop offset="100%" stopColor={COLORS.bg} stopOpacity="1" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="100%" height="50" fill={`url(#${id}-scan)`} />
        <rect width="220" height="50" fill={`url(#${id}-fade)`} />

        <g filter={`url(#${id}-displace)`}>
          <text x="15" y="27" className="gnav-blue" dominantBaseline="middle">
            {label}
          </text>
          <text x="15" y="27" className="gnav-red" dominantBaseline="middle">
            {label}
          </text>
        </g>

        <rect x="0" y="0" width="10" height="0" fill={COLORS.blue} className="gnav-fill" filter={`url(#${id}-displace)`} />
        <rect x="0" y="0" width="10" height="0" fill={COLORS.red} className="gnav-fill" filter={`url(#${id}-displace)`} />
        <rect x="0" y="0" width="100%" height="50" fill="none" stroke={COLORS.red} strokeWidth="3" />
      </svg>
    </LinkComp>
  );
}

/* ---------------- navbar ---------------- */

const DEFAULT_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Decks", href: "/decks" },
  { label: "Editor", href: "/editor" },
  { label: "About", href: "/about" },
];

export default function GlitchNavbar({
  brand = "airDeck_",
  items = DEFAULT_ITEMS,
  linkComponent = "a",
}) {
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(null);
  const [pathname, setPathname] = useState("/");

  // read the current URL on mount (also works with react-router)
  useEffect(() => {
    setPathname(window.location.pathname);
    const onPop = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // active = clicked item, else current URL path
  const activeHref = clicked ?? pathname;

  return (
    <header className="gnav">
      <div className="gnav-inner">
        <a href="/" className="gnav-brand" onClick={() => setClicked("/")}>
          {brand}
        </a>

        <button
          className={`gnav-burger${open ? " is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`gnav-menu${open ? " is-open" : ""}`} aria-label="Main">
          {items.map((item) => (
            <GlitchNavItem
              key={item.href}
              label={item.label}
              href={item.href}
              as={linkComponent}
              isActive={activeHref === item.href}
              onActivate={() => {
                setClicked(item.href);
                setOpen(false); // close mobile menu on navigation
              }}
            />
          ))}
        </nav>
      </div>

      <style>{`
        .gnav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: ${COLORS.bg};
          border-bottom: 2px solid ${COLORS.red};
          font-family: "Kode Mono", monospace;
        }
        .gnav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .gnav-brand {
          background: ${COLORS.red};
          color: ${COLORS.bg};
          text-decoration: none;
          font-size: 20px;
          font-weight: 700;
          padding: 3px 8px;
          letter-spacing: 0.5px;
          white-space: nowrap;
          text-shadow: 1px 0 ${COLORS.blue};
        }
        .gnav-menu {
          display: flex;
          gap: 10px;
        }
        .gnav-item {
          display: block;
          line-height: 0;
          outline: none;
        }
        .gnav-item:focus-visible svg {
          outline: 2px dashed ${COLORS.blue};
          outline-offset: 3px;
        }
        .gnav-item svg {
          width: clamp(130px, 15vw, 190px);
          height: auto;
          display: block;
        }
        .gnav text {
          fill: ${COLORS.red};
          font-size: 21px;
          font-family: "Kode Mono", monospace;
        }
        .gnav text.gnav-blue {
          fill: ${COLORS.blue};
        }
        .gnav-burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 44px;
          height: 44px;
          padding: 8px;
          background: transparent;
          border: 2px solid ${COLORS.red};
          cursor: pointer;
        }
        .gnav-burger span {
          display: block;
          height: 3px;
          width: 100%;
          background: ${COLORS.red};
          box-shadow: -1.5px 0 ${COLORS.blue};
          transition: transform 0.25s, opacity 0.2s;
        }
        .gnav-burger.is-open span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        .gnav-burger.is-open span:nth-child(2) {
          opacity: 0;
        }
        .gnav-burger.is-open span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        @media (max-width: 820px) {
          .gnav-burger {
            display: flex;
          }
          .gnav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            padding: 0 16px;
            background: ${COLORS.bg};
            border-bottom: 2px solid ${COLORS.red};
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease, padding 0.3s ease;
          }
          .gnav-menu.is-open {
            max-height: 80vh;
            padding: 16px;
          }
          .gnav-item svg {
            width: min(100%, 340px);
          }
        }
      `}</style>
    </header>
  );
}