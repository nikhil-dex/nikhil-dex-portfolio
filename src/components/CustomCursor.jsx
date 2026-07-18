import { useRef, useEffect } from "react";
export default function CustomCursor({ containerRef }) {
    const ringRef = useRef(null);
    const dotRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const ring = ringRef.current;
        const dot = dotRef.current;
        if (!container || !ring || !dot) return;

        let mouseX = -100, mouseY = -100;   // start off-screen
        let ringX = -100, ringY = -100;
        let visible = false;
        let rafId;

        const onMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        const onEnter = () => { visible = true; };
        const onLeave = () => { visible = false; };

        container.addEventListener("mousemove", onMove);
        container.addEventListener("mouseenter", onEnter);
        container.addEventListener("mouseleave", onLeave);

        const loop = () => {
            // dot exactly cursor pe
            dot.style.transform =
                `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

            // ring thoda peeche follow karti hai (lerp)
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            ring.style.transform =
                `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

            const op = visible ? 1 : 0;
            ring.style.opacity = op;
            dot.style.opacity = op;

            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(rafId);
            container.removeEventListener("mousemove", onMove);
            container.removeEventListener("mouseenter", onEnter);
            container.removeEventListener("mouseleave", onLeave);
        };
    }, [containerRef]);

    return (
        <>
            {/* Ring ⭕ */}
            <div
                ref={ringRef}
                className="
                    fixed top-0 left-0 z-[100]
                    w-10 h-10
                    rounded-full
                    border-2 border-black
                    pointer-events-none
                    opacity-0
                    transition-opacity duration-200
                "
            />
            {/* Center dot */}
            <div
                ref={dotRef}
                className="
                    fixed top-0 left-0 z-[100]
                    w-1.5 h-1.5
                    rounded-full
                    bg-black
                    pointer-events-none
                    opacity-0
                    transition-opacity duration-200
                "
            />
        </>
    );
}