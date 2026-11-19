import { motion } from "framer-motion";

const links = [
    { label: "Projects", href: "#projects" },
    { label: "Approach", href: "#approach" },
    { label: "Studio", href: "#studio" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 z-50 w-full px-6 sm:px-10 lg:px-16"
        >
            <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between border-b border-white/10">

                <a href="#" className="text-lg tracking-[0.28em]">
                    AETHER
                </a>

                <div className="hidden items-center gap-12 md:flex">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-[13px] tracking-[0.2em] text-white/60 transition-colors hover:text-white"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <a
                    href="#contact"
                    className="rounded-full border border-white/25 px-5 py-2.5 text-[11px] tracking-[0.2em] transition-all hover:border-white hover:bg-white hover:text-black"
                >
                    START A PROJECT
                </a>
            </div>
        </motion.nav>
    );
}