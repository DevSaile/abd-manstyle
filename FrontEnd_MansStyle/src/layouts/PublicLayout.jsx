import { Outlet } from "react-router-dom";
import Navbar from "@/components/public/landing/Navbar";
import ParticlesBackground from "@/components/public/common/ParticlesBackground";

function PublicLayout() {
  return (
    <div className="relative min-h-screen text-gray-100 bg-black overflow-hidden">
      {/* Left fade effect */}

      {/* Content layer */}
      <div className="relative z-10">

        <Outlet />
      </div>
    </div>
  );
}

export default PublicLayout;
