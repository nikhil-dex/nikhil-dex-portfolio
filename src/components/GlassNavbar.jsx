// GlassNavbar.jsx
import { useEffect, useState } from "react";

export default function GlassNavbar() {
    const [visible, setVisible] = useState(false);
    const [showButtons, setShowButtons] = useState(false);

useEffect(() => {
    const onScroll = () => {
        const heroEnd = window.innerHeight * 4.3;

        const isVisible = window.scrollY > heroEnd;

        setVisible(isVisible);

        if (isVisible) {
            setTimeout(() => {
                setShowButtons(true);
            }, 4000);
        } else {
            setShowButtons(false);
        }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
}, []);
    return (
        <div
            className={`
                fixed top-6 left-1/2
                -translate-x-1/2
                z-50
                transition-all duration-700
                ${visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-10"}
            `}
        >
            <div
                className="
                    px-6 py-3
                    rounded-full
                    border border-white/20
                    backdrop-blur-xl
                    bg-white/20
                    shadow-xl
                    flex gap-6 items-center
                "
            >
                <img
                    src="/profile.jpg"
                    className="w-8 h-8 rounded-full"
                />

              


              {!showButtons ? (
    <div className="flex gap-2">
        <div className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" />
        <div
            className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce"
            style={{ animationDelay: "0.2s" }}
        />
        <div
            className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce"
            style={{ animationDelay: "0.4s" }}
        />
    </div>
) : (
    <div className="flex gap-3">
          <span className="font-medium">
                    Nikhil
                </span>
        <button
            onClick={() =>
                document
                    .getElementById("about")
                    .scrollIntoView({
                        behavior: "smooth",
                    })
            }
        >
            About
        </button>

        <button className="pr-5"
            onClick={() =>
                document
                    .getElementById("services")
                    .scrollIntoView({
                        behavior: "smooth",
                    })
            }
        >
            Services
        </button>
    </div>
)}
            </div>
        </div>
    );
}