"use client";

import {
    SiReact,
    SiNextdotjs,
    SiJavascript,
    SiPostgresql,
    SiMongodb,
    SiExpress,
    SiUbuntu,
    SiGithub,
    SiPandas,
    SiNumpy,
    SiScikitlearn,
} from "react-icons/si";
import {
    Monitor,
    Brain,
    LayoutTemplate,
    Rocket,
} from "lucide-react";

/* ---------- Tech stack data ---------- */
/* icon = react-icons component, label = text tile (jaise screenshot me "TS") */
const stack = [
    { icon: SiReact, name: "React" },
    { icon: SiNextdotjs, name: "Next.js" },
    { icon: SiJavascript, name: "JavaScript" },
    { icon: SiPostgresql, name: "PostgreSQL" },
    { icon: SiMongodb, name: "MongoDB" },
    { icon: SiExpress, name: "Express" },
    { icon: SiUbuntu, name: "Ubuntu" },
    { icon: SiGithub, name: "GitHub" },
    { label: "BI", name: "Power BI" },
    { label: "XLS", name: "MS Excel" },
    { icon: SiPandas, name: "pandas" },
    { icon: SiNumpy, name: "NumPy" },
    { icon: SiScikitlearn, name: "scikit-learn" },
];

/* ---------- Services data ---------- */
const services = [
    { icon: Monitor, title: "Web Applications" },
    { icon: Brain, title: "ML Models" },
    { icon: LayoutTemplate, title: "Landing Pages" },
    { icon: Rocket, title: "Startup MVPs" },
];

/* ---------- Tech tile ---------- */
function TechTile({ icon: Icon, label, name }) {
    return (
        <div
            className="
                group
                relative
                w-20 h-20
                md:w-24 md:h-24
                rounded-2xl
                bg-white
                border border-neutral-200
                shadow-sm
                flex items-center justify-center
                transition
                hover:-translate-y-1
                hover:shadow-md
            "
            title={name}
        >
            {Icon ? (
                <Icon className="text-3xl md:text-4xl text-neutral-500 group-hover:text-black transition" />
            ) : (
                <span className="text-lg md:text-xl font-extrabold tracking-tight text-neutral-500 group-hover:text-black transition">
                    {label}
                </span>
            )}

            {/* tooltip */}
            <span
                className="
                    absolute -bottom-8
                    text-xs
                    px-2 py-1
                    rounded-md
                    bg-black text-white
                    opacity-0
                    group-hover:opacity-100
                    transition
                    pointer-events-none
                    whitespace-nowrap
                "
            >
                {/* {name} */}
            </span>
        </div>
    );
}

/* ---------- Service row ---------- */
function ServiceItem({ icon: Icon, title }) {
    return (
        <div className="group flex items-center gap-8 cursor-default">
            <div
                className="
                    w-20 h-20
                    md:w-24 md:h-24
                    rounded-full
                    bg-black
                    flex items-center justify-center
                    shrink-0
                    transition
                    group-hover:scale-110
                "
            >
                <Icon className="w-8 h-8 md:w-9 md:h-9 text-white" strokeWidth={1.8} />
            </div>

            <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-black">
                {title}
            </h3>
        </div>
    );
}

/* ---------- Section ---------- */
export default function Services() {
    return (
        <section
            id="services"
            className="
                relative
                bg-[#f5f5f4]
                text-black
                py-28
                md:py-40
            "
        >
            <div className="max-w-[1600px] mx-auto px-6 md:px-14">
                <div className="grid lg:grid-cols-2 gap-24">
                    {/* LEFT — headline + stack */}
                    <div>
                        <h2
                            className="
                                text-6xl
                                md:text-8xl
                                font-display
                                font-semibold
                                leading-[1.02]
                                tracking-tight
                            "
                        >
                            <span className="block text-neutral-400">
                                I build stuff
                            </span>
                            <span className="block">for me</span>
                            <span className="block">and for you.</span>
                        </h2>

                        {/* Tech stack */}
                        <p className="mt-20 mb-6 text-lg text-neutral-600">
                            My tech stack
                        </p>

                        <div className="flex flex-wrap gap-4 max-w-xl">
                            {stack.map((t) => (
                                <TechTile key={t.name} {...t} />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — services */}
                    <div className="flex flex-col justify-center gap-14 md:gap-20">
                        {services.map((s) => (
                            <ServiceItem key={s.title} {...s} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}