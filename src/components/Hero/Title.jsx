"use client";

/**
 * GlitchTitle — same retro glitch effect as the navbar, for any HTML text.
 *
 * Works on normal HTML (h1, h2, p...) by applying the SVG
 * feDisplacementMap filter via CSS `filter: url(#id)` — so you keep
 * your Tailwind classes, layout, and scroll transforms untouched.
 *
 * What it does:
 *   - looping random glitch bursts (same banded displacement as the nav)
 *   - red/blue chromatic copies flash + offset during each burst
 *   - bigger burst on hover
 *   - respects prefers-reduced-motion
 *
 * Usage (your exact header):
 *
 *   <GlitchTitle
 *     as="h1"
 *     className="absolute left-[8%] top-[22%] text-6xl font-display font-semibold z-10"
 *     style={{ transform: `translateY(${kf(progress, [[0, 0], [0.4, -120]])}vh)` }}
 *   >
 *     This is<br />Nikhil&apos;s portfolio
 *   </GlitchTitle>
 *
 * Props:
 *   as        - tag to render ("h1" default)
 *   intensity - max displacement strength (default 0.2, nav used up to 2)
 *   loopDelay - seconds between auto bursts (default 2, like the nav's active loop)
 *   loop      - auto-glitch on repeat (default true; set false = hover only)
 *   red/blue  - chroma colors (defaults match the navbar)
 *
 * Note: needs `npm i gsap`. Plain React: just remove the "use client" line.
 * Safari can be picky about feDisplacementMap on HTML elements — if the
 * glitch doesn't render there, the text still displays perfectly normally.
 */

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { RoughEase } from "gsap/EasePack";

gsap.registerPlugin(RoughEase);

const rand = (min, max) => Math.random() * (max - min) + min;

export default function Title({
  as: Tag = "h1",
  children,
  className = "",
  style = {},
  intensity = 0.2,
  loopDelay = 2,
  loop = true,
  red = "#f55a6b",
  blue = "#5accf5",
  ...rest
}) {
  const id = useId().replace(/:/g, "");
  const rootRef = useRef(null);
  const displaceRef = useRef(null);
  const redRef = useRef(null);
  const blueRef = useRef(null);
  const hoverTl = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const displace = displaceRef.current;
    const redEl = redRef.current;
    const blueEl = blueRef.current;
    const easeIn = RoughEase.ease.config({ strength: 5, points: 10 });

    // one glitch burst: displacement spike + chroma layers flash apart
    const burst = (tl, maxScale) => {
      tl.to(displace, {
        attr: { scale: () => rand(maxScale * 0.4, maxScale) },
        ease: easeIn,
        duration: 0.25,
      })
        .to(redEl, { x: () => rand(3, 10), opacity: 1, ease: easeIn, duration: 0.25 }, 0)
        .to(blueEl, { x: () => rand(-10, -3), opacity: 1, ease: easeIn, duration: 0.25 }, 0)
        .to(displace, { attr: { scale: 0 }, ease: easeIn, duration: () => rand(0.05, 0.12) })
        .to(redEl, { x: 0, opacity: 0, ease: easeIn, duration: 0.1 }, "<")
        .to(blueEl, { x: 0, opacity: 0, ease: easeIn, duration: 0.1 }, "<");
      return tl;
    };

    // auto loop (like the navbar's "active" glitch every ~2s)
    let loopTl;
    if (loop) {
      loopTl = burst(
        gsap.timeline({ repeat: -1, repeatDelay: loopDelay, repeatRefresh: true }),
        intensity
      );
    }

    // stronger burst on hover (like the navbar's mouseenter)
    hoverTl.current = burst(gsap.timeline({ paused: true, repeatRefresh: true }), intensity * 2.5);

    return () => {
      loopTl?.kill();
      hoverTl.current?.kill();
    };
  }, [intensity, loop, loopDelay]);

  const onEnter = () => hoverTl.current?.restart();

  const layerStyle = {
    position: "absolute",
    inset: 0,
    opacity: 0,
    pointerEvents: "none",
    userSelect: "none",
  };

  return (
    <Tag
      ref={rootRef}
      className={className}
      style={{ filter: `url(#${id}-displace)`, ...style }}
    //   style={{ position: "relative", filter: `url(#${id}-displace)`, ...style }}
      onMouseEnter={onEnter}
      {...rest}
    >
      {/* the filter lives in a 0x0 svg; bands are % based so it fits any size */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
        <defs>
          <filter
            id={`${id}-displace`}
            primitiveUnits="objectBoundingBox"
            colorInterpolationFilters="sRGB"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <feFlood
                key={i}
                floodColor={i % 2 === 0 ? "#8888FF" : "#888800"}
                y={`${i * 5}%`}
                height="5%"
                result={`s${i}`}
              />
            ))}
            <feMerge result="bands">
              {Array.from({ length: 20 }).map((_, i) => (
                <feMergeNode key={i} in={`s${i}`} />
              ))}
            </feMerge>
            <feDisplacementMap
              ref={displaceRef}
              in="SourceGraphic"
              in2="bands"
              scale="0"
              xChannelSelector="B"
              yChannelSelector="R"
            />
          </filter>
        </defs>
      </svg>

      {/* chroma layers (behind), flash into view during bursts */}
      <span ref={blueRef} style={{ ...layerStyle, color: blue }} aria-hidden="true">
        {children}
      </span>
      <span ref={redRef} style={{ ...layerStyle, color: red }} aria-hidden="true">
        {children}
      </span>

      {/* real text on top, keeps your normal color */}
      <span style={{ position: "relative" }}>{children}</span>
    </Tag>
  );
}