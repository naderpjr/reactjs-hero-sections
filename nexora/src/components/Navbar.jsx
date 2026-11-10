
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

function Navbar() {
    const navRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                navRef.current,
                {
                    y: -30,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 2.2,
                    ease: "power3.out",
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <nav
            ref={navRef}
            className="absolute top-[50px] left-[60px] right-[60px] z-20 flex items-center justify-between"
        >
            <a href="#" className="text-2xl font-bold tracking-tight text-gray-600">
                NEXORA.
            </a>

            <div className="hidden md:flex items-center gap-10 text-sm text-gray-400">
                <a href="#" className="hover:text-gray-800 transition">Home</a>
                <a href="#" className="hover:text-gray-800 transition">About</a>
                <a href="#" className="hover:text-gray-800 transition">Features</a>
                <a href="#" className="hover:text-gray-800 transition">Contact</a>
            </div>

            <a
                href="#"
                className="rounded-full border border-gray-600 px-6 py-3 text-sm text-gray-600 hover:bg-white hover:text-black transition"
            >
                Get Started
            </a>
        </nav>
    );
}

export default Navbar;
