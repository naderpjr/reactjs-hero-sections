import { motion } from "framer-motion";
import Scene from "./Scene";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Scene />
            </div>

            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

            <div className="relative z-20 mx-auto flex h-full max-w-[1600px] flex-col px-6 sm:px-10 lg:px-16">
                <div className="flex flex-1 flex-col justify-center pt-16 lg:pt-10">

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="mb-6 text-[11px] font-medium tracking-[0.4em] text-white/50 sm:mb-8"
                    >
                        ARCHITECTURE STUDIO
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-5xl text-[clamp(3.4rem,9vw,8.5rem)] font-medium leading-[0.88] tracking-[-0.04em]"
                    >
                        Build the
                        <br />
                        extraordinary simply.
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.6 }}
                        className="mt-10 flex flex-col gap-8 sm:mt-14 sm:flex-row sm:items-end sm:justify-between"
                    >
                        <p className="max-w-md text-[15px] leading-7 text-white/70 sm:text-base">
                            We craft architecture where light, form and human experience
                            meet — creating timeless environments for living and working.
                        </p>

                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="flex items-center justify-between border-t border-white/10 py-6 text-[10px] font-medium tracking-[0.25em] text-white/40"
                >
                    <span className="hidden sm:block">NEW YORK</span>
                    <span>ARCHITECTURE & INTERIORS</span>
                    <span className="hidden md:block">UNITED STATES</span>
                </motion.div>
            </div>
        </section>
    );
}