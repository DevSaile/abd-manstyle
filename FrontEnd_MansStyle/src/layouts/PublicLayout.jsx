import { Outlet } from "react-router-dom";
import Navbar from "../components/public/landing/Navbar";
import ParticlesBackground from "../components/public/landing/ParticlesBackground";

function PublicLayout() {
  return (
    <div className="relative min-h-screen text-gray-100 bg-black overflow-hidden">
      <Navbar />
      <ParticlesBackground />

      {/* Left fade effect */}
      <div className="pointer-events-none fixed top-0 left-0 w-full h-32 z-20 bg-gradient-to-b from-black via-black/80 to-transparent" />

      {/* Content layer */}
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}

export default PublicLayout;
