"use client";

import { useEffect, useRef } from "react";

function SocialButton({ children, href = "#" }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="
                inline-flex
                items-center
                h-12
                px-5
                rounded-full
                bg-white/10
                backdrop-blur-xl
                border
                border-white/10
                hover:scale-105
                transition
            "
        >
            {children}
        </a>
    );
}

function FooterLink({ children, href = "#" }) {
    return (
        <a
            href={href}
            className="
                block
                text-white
                hover:underline
                hover:text-neutral-300
                transition
            "
        >
            {children}
        </a>
    );
}

export default function Footer() {
    const footerRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const footer = footerRef.current;
        const canvas = canvasRef.current;
        if (!footer || !canvas) return;

        // respect reduced motion
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const ctx = canvas.getContext("2d");
        let points = [];
        let rafId;

        const TRAIL_LIFE = 900; // ms each point lives
        const MAX_WIDTH = 7;    // marker thickness

    const resize = () => {
    const rect = footer.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
};
        resize();

        const ro = new ResizeObserver(resize);
        ro.observe(footer);

        // const onMove = (e) => {
        //     const rect = footer.getBoundingClientRect();
        //     const OFFSET_X =0;
        //     const OFFSET_Y =0;
        //     points.push({
        //         x: e.clientX - rect.left - OFFSET_X,
        //         y: e.clientY - rect.top -OFFSET_Y,
        //         time: performance.now(),
        //     });
        // };
        const addPoint = (x, y) => {
    const rect = footer.getBoundingClientRect();
    const px = x - rect.left;
    const py = y - rect.top;
    const last = points[points.length - 1];

    // agar gap bada hai to beech me extra points bhar do (density)
    if (last) {
        const dx = px - last.x;
        const dy = py - last.y;
        const dist = Math.hypot(dx, dy);
        const SPACING = 4; // px — jitna chhota, utna denser
        if (dist > SPACING && dist < 150) {
            const steps = Math.floor(dist / SPACING);
            for (let i = 1; i < steps; i++) {
                const t = i / steps;
                points.push({
                    x: last.x + dx * t,
                    y: last.y + dy * t,
                    time: performance.now(),
                });
            }
        }
    }
    points.push({ x: px, y: py, time: performance.now() });
};

const onMove = (e) => {
    // browser events batch karta hai — coalesced se saare raw points milte hain
    const events = e.getCoalescedEvents?.() ?? [e];
    for (const ev of events) addPoint(ev.clientX, ev.clientY);
};
        footer.addEventListener("pointermove", onMove);
// cleanup me bhi:
// footer.removeEventListener("pointermove", onMove);

        const draw = () => {
            const now = performance.now();
            points = points.filter((p) => now - p.time < TRAIL_LIFE);

           ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (points.length > 1) {
                ctx.lineCap = "round";
                ctx.lineJoin = "round";

              for (let i = 1; i < points.length - 1; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];

    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    if (dx * dx + dy * dy > 150 * 150) continue;

    const age = now - p1.time;
    const life = 1 - age / TRAIL_LIFE;
    const eased = life * life;

    ctx.strokeStyle = `rgba(255, 255, 255, ${eased})`;
    ctx.lineWidth = Math.max(1, MAX_WIDTH * life);

    const mid1 = { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
    const mid2 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

    ctx.beginPath();
    ctx.moveTo(mid1.x, mid1.y);
    ctx.quadraticCurveTo(p1.x, p1.y, mid2.x, mid2.y);
    ctx.stroke();
}
            }
            rafId = requestAnimationFrame(draw);
        };
        rafId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafId);
            footer.removeEventListener("pointermove", onMove);
            ro.disconnect();
        };
    }, []);

    return (
        <footer
            ref={footerRef}
            id="footer"
            className="
                relative
                overflow-hidden
                bg-black
                text-white
                pt-28
                md:pt-40
            "
        >
            {/* Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:120px_120px]" />
            </div>

            {/* Marker Canvas */}
            <canvas
                ref={canvasRef}
                id="markerCanvas"
                className="absolute inset-0 z-0 pointer-events-none"
            />

            <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-14">
                {/* Heading */}
                <h2
                    className="
                        text-5xl
                        md:text-8xl
                        font-display
                        leading-none
                        tracking-tight
                    "
                >
                    <span className="block text-white">
                        Let's build
                    </span>

                    <span className="block text-neutral-500">
                        something incredible together.
                    </span>
                </h2>

                {/* Tagline */}
                <p className="mt-8 text-neutral-400 max-w-xl">
                    Engineering Student • Full Stack Developer •
                    AI Enthusiast
                </p>

                {/* Contact */}
                <div
                    className="
                        mt-24
                        grid
                        md:grid-cols-2
                        gap-12
                        pb-12
                        border-b
                        border-white/15
                    "
                >
                    <div>
                        <p className="text-neutral-500 mb-4">
                            Contact
                        </p>

                        <a
                            href="mailto:jincossec@gmail.com"
                            className="
                                text-2xl
                                md:text-4xl
                                font-semibold
                                hover:underline
                            "
                        >
                            jincossec@gmail.com
                        </a>
                    </div>

                    <div>
                        <p className="text-neutral-500 mb-4">
                            Social
                        </p>

                        <div className="flex gap-3 flex-wrap">
                            <SocialButton href="https://github.com/nikhil-dex">GitHub</SocialButton>
                            <SocialButton href="https://www.linkedin.com/in/nikhil-b203a2242">LinkedIn</SocialButton>
                            <SocialButton href="https://x.com/drip_nikhil">X</SocialButton>
                            <SocialButton href="https://reddit.com/user/nikhil-web">Reddit</SocialButton>
                        </div>
                    </div>
                </div>

                {/* Links */}
                <div
                    className="
                        py-12
                        grid
                        md:grid-cols-3
                        gap-10
                    "
                >
                    <div>
                        <p className="text-neutral-500 mb-5">
                            Navigation
                        </p>

                        <div className="space-y-3">
                            <FooterLink href="#projects">Projects</FooterLink>
                            <FooterLink href="#about">About</FooterLink>
                            <FooterLink href="#services">Services</FooterLink>
                        </div>
                    </div>

                    <div>
                        <p className="text-neutral-500 mb-5">
                            Resources
                        </p>

                        <div className="space-y-3">
                            <FooterLink href="https://drive.google.com/open?id=1vlX9VlZTDk9HKmBfdnxjzRi3XlCm61WL&usp=drive_fs">Resume</FooterLink>
                            <FooterLink href="https://github.com/nikhil-dex">GitHub</FooterLink>
                            <FooterLink href="https://leetcode.com/u/nikhil-dex/">LeetCode</FooterLink>
                        </div>
                    </div>

                    <div className="md:text-right">
                        <p className="text-neutral-500">
                            © 2026 Nikhil
                        </p>
                    </div>
                </div>
            </div>

            {/* Giant Name */}
            <h1
                className="
                    relative
                    z-10
                    text-center
                    text-[22vw]
                    font-black
                    leading-[0.8]
                    text-white/90
                    select-none
                    translate-y-[20%]
                    [mask-image:linear-gradient(to_bottom,black_60%,transparent)]
                    pointer-events-none
                "
            >
                NIKHIL
            </h1>
        </footer>
    );
}