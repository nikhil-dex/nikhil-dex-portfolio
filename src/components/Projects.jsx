import useReveal from '../hooks/useReveal';
import { useRef } from 'react';
import useSectionProgress from '../hooks/useSectionProgress';
import { kf } from '../utils/kf';

const projects = [
  {
    title: 'AI Chatbot',
    tag: 'Web App',
    img: '/AiChatbot.png',
    live: 'https://basic-chatbot-gemini.vercel.app/',
    code: 'https://github.com/nikhil-dex/Ai-gdg-chatbot',
  },
  {
    title: 'AirDeck',
    tag: 'Presentation Tool',
    img: '/AirDeck.png',
    live: '#',
    code: 'https://github.com/nikhil-dex/YOUR_REPO',
  },
  {
    title: 'ApnaNotes',
    tag: 'Notes App',
    img: '/ApnaNotes.png',
    live: 'https://apnanotes-three.vercel.app/',
    code: 'https://github.com/nikhil-dex/Apnanotes',
  },
  {
    title: 'PortfolioGen',
    tag: 'Generator Tool',
    img: '/ProtofolioGen.png',
    live: 'https://protofolio.nikhil-dex.in/',
    code: 'https://github.com/nikhil-dex/protoFolio',
  },
];

function ProjectCard({ p, index, progress, isMobile }) {
const t = kf(progress, [
    [0.0, 0],
    [0.7, 1],
    [1, 1],
]);



let targetX;
let targetY;
let targetRot;

if (index === 0) {

    targetX = kf(progress, [
        [0,110],
        [1, 0],
    ]);

    targetY = kf(progress, [
        [0.0,-220],
        [1, 2],
    ]);

    targetRot = kf(progress, [
        [0, -6],
        [0.55, -6],
        [1, 0],
    ]);

} else if (index === 1) {

    targetX = kf(progress, [
        [0, 5],
        [0.55, 5],
        [1, 0],
    ]);

    targetY = kf(progress, [
        [0, -220],
        [1, 0],
    ]);

    targetRot = kf(progress, [
        [0, 4],
        [0.55, 4],
        [1, 0],
    ]);

} else if (index === 2) {
// apna notes
    targetX = kf(progress, [
        [0, 115],
        [1, 0],
    ]);

    targetY = kf(progress, [
        [0, -355],
        [1, 0],
    ]);

    targetRot = kf(progress, [
        [0, 20],
        [0.55, 8],
        [1, 0],
    ]);

} else {
//portfolio gen
    targetX = kf(progress, [
        [0, 5],
        [0.55, 5],
        [1, 0],
    ]);

    targetY = kf(progress, [
        [0, -360],
        [1, 0],
    ]);

    targetRot = kf(progress, [
        [0, -20],
        [0.55, -3],
        [1, 0],
    ]);
}


const shadow = 10 + (1 - t) * 30;

const scale = 0.8 +( 0.2* t);


 return (
<div
  className="
    rounded-3xl
    border
    border-white/20
    bg-white/10
    p-4
  "
  style={{
    zIndex: 10 - index,
    position: "relative",
  }}
>
    {/* IMAGE CARD (Animated) */}
    <a
      href={p.live}
      target="_blank"
      rel="noreferrer"
      className="
        group
        block
        relative
        overflow-hidden
        rounded-2xl
        bg-neutral-100
        shadow-sm
        transition-all
        duration-700
        ease-out
      "
  style={{
    transform: isMobile
        ? `translateY(${30*(1-t)}px)
        scale(${0.9+0.1*t})
          `
        : `
            translate(${targetX}%, ${targetY}%)
            rotate(${targetRot}deg)
            scale(${scale})
          `,
          opacity: isMobile ? t : 1,
    boxShadow: `
    0 ${shadow}px ${shadow * 2}px
    rgba(0,0,0,0.15)
`,

}}
    >
      
      <img
        src={p.img}
        alt={p.title}
        className="
          w-full
          aspect-[16/10]
          object-cover
          rounded-2xl
          transition-transform
          duration-500
          group-hover:scale-[1.03]
        "
      />
      <div
    className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black/20
        to-transparent
        pointer-events-none
    "
/>

      <span
        className="
          absolute
          bottom-4
          right-5
          text-white
          font-semibold
          text-lg
          drop-shadow-md
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-300
        "
      >
        View Now ↗
      </span>
    </a>

    {/* DETAILS (Static) */}
    <div className="mt-4 flex items-center justify-between">
      <div>
        <h3 className="text-lg md:text-2xl font-display font-semibold text-neutral-900">
          {p.title}
        </h3>

        <p className="text-neutral-500">
          {p.tag}
        </p>
      </div>

      <a
        href={p.code}
        target="_blank"
        rel="noreferrer"
        className="
          text-xs
          md:text-sm
          text-neutral-600
          hover:text-neutral-900
          underline
          underline-offset-4
          transition-colors
          hover:-translate-y-2
        "
      >
        View Project ↗
      </a>
    </div>
  </div>
);
}

export default function Projects() {
  const gridRef = useRef(null);
  const isMobile = window.innerWidth < 768;
const progress = useSectionProgress(gridRef, 0.2);
  return (
    <section
    id="projects"
    className={`
    px-[8%]
    py-28
    overflow-x-hidden
   ${isMobile ? "min-h-[250vh]" : "min-h-[220vh]"}
`}
>
     <div className={isMobile ? "min-h-[40vh]" : "min-h-[80vh]"}>
    <span className="inline-flex rounded-full border px-4 py-2">
        Available for Work
    </span>

   <h6 className="text-5xl md:text-8xl mt-8 leading-tight">
        Building things
        <br />
        you like.
    </h6>

    <p className="mt-6 max-w-xl">
        I design and build the websites, apps, and tools
        your idea needs to go live.
    </p>
</div>
      <div 
      ref={gridRef}
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-x-8
        gap-y-16
        w-full
    "
  
      >
        {/* <div className={isMobile? "mb-2" : "mb-8"}> */}

 <h2 className="col-span-1 md:col-span-2 text-5xl mb-1">
    Selected Work
</h2>
        {/* </div> */}
        {projects.map((p, i) => (
          <ProjectCard 
          key={p.title} 
          p={p} index={i} 
          progress={progress}
          isMobile={isMobile}
          />
        ))}
      </div>
    </section>
  );
}