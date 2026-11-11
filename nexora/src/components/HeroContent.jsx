
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

function HeroContent() {
    const contentRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            gsap.fromTo(
                contentRef.current.children,
                {
                    y: 80,
                    opacity: 0,
                    scale: 0.96,
                    filter: "blur(10px)",
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 1.8,
                    stagger: 0.5,
                    delay: 2,
                    ease: "expo.out",
                    clearProps: "filter,transform",
                }
            );

        }, contentRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={contentRef}
            className="
                absolute z-10
                left-6 right-6 bottom-8
                lg:left-[8%] lg:right-auto
                lg:top-1/2 lg:bottom-auto
                lg:-translate-y-1/2
                max-w-xl text-gray-900
            "
        >

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.05] tracking-tight mb-4 md:mb-6">
                Beyond
                <br />
                The Ordinary.
            </h1>

            <p className="text-sm md:text-base text-gray-600 leading-7 max-w-md mb-6 md:mb-8">
                Discover a new perspective. Experience something extraordinary
                and redefine the way you see the world.
            </p>

            <a
                href="#"
                className="inline-flex items-center gap-5 rounded-full bg-gray-900 text-white px-7 py-4 text-sm font-medium hover:bg-gray-700 transition"
            >
                Discover More
                <span>↗</span>
            </a>
        </div>
    );
}

export default HeroContent;
