// GlassNavbar.jsx
import { useEffect, useState } from "react";
import {motion} from "motion/react";

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

const smoothScrollTo = (targetId, duration = 2000) => {
  const target = document.getElementById(targetId);
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const easeInOut = (t) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  const animation = (currentTime) => {
    if (!startTime) startTime = currentTime;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    window.scrollTo({
      top: startPosition + distance * easeInOut(progress),
    });

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

    return (
        <>
        <div
            // initial={{ opacity: 0, y: -20 }}
            // animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
            // transition={{ duration: 0.5 }}
            
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
            <motion.div
                drag
                dragConstraints={{ left: -200, right: 200 ,top: 0, bottom: 0}}
               

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
                    onClick={()=> smoothScrollTo("footer",5000)}
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
        
        <button onClick={() => smoothScrollTo("Hero", 4000)}>
  <span className="font-medium">Nikhil</span>
</button>
        
       
         
                
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
            </motion.div>
        </div>
        </>
    );
}