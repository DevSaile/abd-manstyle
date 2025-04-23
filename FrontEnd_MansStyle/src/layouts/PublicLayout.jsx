// PublicLayout.jsx

import { Outlet } from "react-router-dom";

import ParticlesBackground from "../components/public/landing/ParticlesBackground";
function PublicLayout() {
  return (
    <div className="relative min-h-screen text-gray-100 bg-black">
<ParticlesBackground/>
      {/* Content layer */}
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}

export default PublicLayout;
