import { Outlet } from "react-router-dom";
import Navbar from "../components/public/landing/Navbar";
import ParticlesBackground from "../components/public/common/ParticlesBackground";

function PublicLayout() {
  return (
    <div className="relative min-h-screen text-gray-100 bg-black overflow-hidden">
      <ParticlesBackground color={"0f0f0f"} />
      {/* Left fade effect */}

      {/* Content layer */}
      <div className="relative z-10">
        <Navbar />

        <Outlet />
      </div>
    </div>
  );
}

export default PublicLayout;
