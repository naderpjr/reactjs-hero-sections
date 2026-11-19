import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function App() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-black text-white antialiased">
            <Navbar />
            <Hero />
        </main>
    );
}