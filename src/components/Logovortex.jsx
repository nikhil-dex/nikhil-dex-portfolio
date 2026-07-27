"use client";

/**
 * LogoVortex — airDeck logo vortex animation
 *
 * Same effect as the triangle-vortex demo, adapted for a PNG:
 * the logo is cloned N times, and each clone rotates + shrinks
 * with a stagger, forming a spiralling tunnel. A 45°-rotated
 * gradient overlay recreates the original's <rect fill="url(#grad)">.
 *
 * Setup:
 *   1. npm i gsap
 *   2. Put the logo at /public/airdeck_logo_futuristic_v2.png
 *   3. <LogoVortex />  (fills its parent; give the parent a height)
 *
 * Note: the PNG has an opaque black background, so every clone uses
 * mix-blend-mode: screen — black becomes invisible and the neon lines
 * stack additively, exactly like the SVG strokes in the original.
 * Keep the component on a dark background for this to work.
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";

const CLONES = 40; // original used 50 paths; 40 imgs keeps it smooth
const BG = "rgb(0, 0, 0)"; // match your page background
const LOGO_SRC = "/airdeck_logo_nostar.png";

export default function LogoVortex({ src = LOGO_SRC, clones = CLONES }) {
  const stageRef = useRef(null);
  const masterRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return; // show the static logo only

    const imgs = stage.querySelectorAll("img");

    const ctx = gsap.context(() => {
      // == the paused "spread" timeline (rotate -180 + shrink, staggered) ==
      const spread = gsap
        .timeline({ paused: true })
        .to(stage, {
          rotate: -180,
          transformOrigin: "50% 55%", // svgOrigin '5 5.5' in the original
        })
        .to(
          imgs,
          {
            rotate: -180,
            scale: 0.15,
            opacity: 0, // stands in for stroke-width -> 0
            transformOrigin: "50% 55%",
            ease: "power1.in",
            stagger: { amount: 0.5, ease: "sine.in" },
          },
          0
        );

      // == master: scrub spread's progress back and forth forever ==
      masterRef.current = gsap.to(spread, {
        duration: 6,
        ease: "power2.inOut",
        progress: 0.5,
        yoyo: true,
        repeat: -1,
      });
    }, stage);

    return () => ctx.revert();
  }, []);

  // click = pause / resume, same as the original demo
  const toggle = () => {
    const tl = masterRef.current;
    if (tl) gsap.to(tl, { timeScale: tl.isActive() ? 0 : 1 });
  };

  return (
    <div
      onClick={toggle}
      style={{
        position: "relative",
        width: "25%",
        height: "25%",
        minHeight: 480,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BG,
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* stage: the <g> from the original, holding all clones */}
      <div
        ref={stageRef}
        style={{
          position: "relative",
          width: "min(50vw, 50vh, 560px)",
          aspectRatio: "1365 / 1203", // native ratio of the PNG
          willChange: "transform",
        }}
      >
        {Array.from({ length: clones }).map((_, i) => (
          <img
            key={i}
            src={src}
            alt={i === 0 ? "airDeck logo" : ""}
            aria-hidden={i !== 0}
            draggable={false}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              mixBlendMode: "screen", // black bg disappears, neon stacks
              willChange: "transform, opacity",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        ))}
      </div>

      {/* the rotated gradient <rect> from the original */}
      <div
        style={{
          position: "absolute",
          inset: "-30%",
          transform: "rotate(45deg)",
          background: `linear-gradient(
            to bottom,
            ${BG} 9%,
            transparent 30%,
            rgba(10, 10, 14, 0.5) 68%,
            ${BG} 91%
          )`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}