
import { useRef, useEffect } from "react";
import { SiGithub, SiReddit } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
export default function About() {
    const imgWrapRef = useRef(null);
const hoverAreaRef = useRef(null);

useEffect(() => {
    const area = hoverAreaRef.current;
    const wrap = imgWrapRef.current;
    if (!area || !wrap) return;

    let mouseX = 0, mouseY = 0;   // normalized -1 to 1
    let curX = 0, curY = 0;
    let hovering = false;
    let rafId;

    const STRENGTH_X = 30;  // max px movement
    const STRENGTH_Y = 18;

    const onMove = (e) => {
        const rect = area.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    const onEnter = () => { hovering = true; };
    const onLeave = () => { hovering = false; };

    area.addEventListener("mousemove", onMove);
    area.addEventListener("mouseenter", onEnter);
    area.addEventListener("mouseleave", onLeave);

    const loop = () => {
        // hover nahi to target 0 — image smoothly wapas center
        const targetX = hovering ? -mouseX * STRENGTH_X : 0;  // minus = opposite
        const targetY = hovering ? -mouseY * STRENGTH_Y : 0;

        curX += (targetX - curX) * 0.08;
        curY += (targetY - curY) * 0.08;

        wrap.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
        rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
        cancelAnimationFrame(rafId);
        area.removeEventListener("mousemove", onMove);
        area.removeEventListener("mouseenter", onEnter);
        area.removeEventListener("mouseleave", onLeave);
    };
}, []);
    return (
        <section
            id="about"
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-white
                px-[8%]
                py-28
            "
        >
            {/* Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="h-full w-full bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:120px_120px]" />
            </div>

            {/* Giant text */}
            <h1
                className="
                    absolute
                    top-1/2
                    left-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    text-[18vw]
                    font-black
                    opacity-[0.03]
                    pointer-events-none
                    select-none
                "
            >
                NIKHIL
            </h1>

            <div
                className="
                    relative
                    z-10
                    grid
                    lg:grid-cols-2
                    items-center
                    gap-20
                    max-w-[1600px]
                    mx-auto
                "
            >
                {/* LEFT */}
                <div>
                    <p className="uppercase tracking-[0.3em] text-neutral-500">
                        ABOUT ME
                    </p>

                    <h2
                        className="
                            mt-6
                            text-6xl
                            md:text-8xl
                            font-display
                            leading-none
                        "
                    >
                        Building
                        <br />
                        the future.
                    </h2>

                    <p
                        className="
                            mt-8
                            text-xl
                            text-neutral-600
                            max-w-xl
                        "
                    >
                        I'm Nikhil, a Computer Science student at
                        MSIT. I build AI products, full-stack
                        applications, and tools that transform
                        ideas into reality.
                    </p>

                    <div
                        className="
                            mt-12
                            grid
                            grid-cols-3
                            gap-8
                        "
                    >
                        <Stat value="100+" label="LeetCode" />
                        <Stat value="MSIT" label="College" />
                        <Stat value="CSE" label="Branch" />
                    </div>

                    <div className="mt-12 space-y-4">
                        <Info title="STATUS" value="ACTIVE" />

                        <Info title="CLASS" value="WEB DEV & DATA ANALYST" />

                        <Info title="LOCATION" value="DELHI, INDIA" />
                    </div>

              <div className="flex gap-4 mt-12">
    
    <Social href="https://github.com/nikhil-dex">
        <SiGithub size={20} />
    </Social> 

  <Social href="https://linkedin.com/in/nikhil-b203a2242">
    <FaLinkedinIn size={20} />
</Social> 

    <Social href="https://reddit.com/user/nikhil-web">
        <SiReddit size={20} />
    </Social>
</div>

                    <a
                        href="mailto:jincossec@gmail.com"
                        className="
                            inline-flex
                            mt-12
                            rounded-full
                            bg-black
                            text-white
                            px-8
                            py-4
                            hover:scale-105
                            transition
                        "
                    >
                        jincossec@gmail.com
                    </a>
                </div>

                {/* RIGHT */}
               {/* RIGHT */}
<div
    ref={hoverAreaRef}
    className="flex justify-center relative"
>
    <div ref={imgWrapRef} className="will-change-transform">
        <img
            src="/Nikhil.png"
            alt="Nikhil"
            className="
                w-[500px]
                max-w-full
                animate-[float_6s_ease-in-out_infinite]
            "
            style={{
                filter: "drop-shadow(-20px 0 0 #070707) drop-shadow(0 40px 60px rgba(0,0,0,.15))",
            }}
        />
    </div>

  <div
    className="
        group
        absolute
        top-0
        right-10
        rotate-90
        select-none
        cursor-default
    "
>
    <span
        className="text-6xl font-bold"
        style={{
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(0,0,0,0.15)",
        }}
    >
        開発者
    </span>

    {/* Tooltip */}
    <span
        className="
            absolute
            left-1/2
            -translate-x-1/2
            -bottom-10
            -rotate-90
            text-sm
            px-3 py-1.5
            rounded-md
            bg-black text-white
            whitespace-nowrap
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-300
            pointer-events-none
        "
    >
        Developer
    </span>
</div>
</div>
            </div>
        </section>
    );
}

function Stat({ value, label }) {
    return (
        <div>
            <h3 className="text-5xl font-bold">
                {value}
            </h3>

            <p className="text-neutral-500 mt-2">
                {label}
            </p>
        </div>
    );
}

function Info({ title, value }) {
    return (
        <div className="flex gap-4">
            <span className="text-neutral-400 w-28">
                {title}
            </span>

            <span className="font-semibold">
                {value}
            </span>
        </div>
    );
}

function Social({ children, href = "#" }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="
                h-12
                w-12
                rounded-full
                border
                border-black/10
                backdrop-blur-xl
                hover:scale-110
                transition
                flex
                items-center
                justify-center
            "
        >
            {children}
        </a>
    );
}
