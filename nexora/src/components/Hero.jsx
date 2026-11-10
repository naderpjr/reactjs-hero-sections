
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import Navbar from "./Navbar";

function Hero() {
    const frameRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                frameRef.current,
                {
                    width: "120px",
                    height: "220px",
                },
                {
                    width: "calc(100vw - 60px)",
                    height: "calc(100dvh - 60px)",
                    duration: 1.8,
                    ease: "power4.inOut",
                    delay: 0.3,
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="h-dvh w-full bg-white flex items-center justify-center overflow-hidden p-[30px]">
            <div
                ref={frameRef}
                className="relative overflow-hidden rounded-xl shrink-0"
            >
                <img
                    src="/bg.png"
                    alt="Hero"
                    className="w-full h-full object-cover"
                />
                <Navbar />
            </div>
        </section>
    );
}

export default Hero;
