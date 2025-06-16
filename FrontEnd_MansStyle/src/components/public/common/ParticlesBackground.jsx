import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = ({ color }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // Optional: You can log or manipulate the container if needed
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: color, // Background color
            },
          },
          fullScreen: {
            enable: true, // Disable full-screen mode
          },
          particles: {
            number: {
              value: 100,
              density: {
                enable: true,
                area: 1000,
              },
            },
            color: {
              value: "#ffffff",
            },
            shape: {
              type: "line",
            },
            opacity: {
              value: 0.4,
            },
            size: {
              value: { min: 5, max: 10 },
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              outModes: {
                default: "bounce",
              },
            },
            links: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 1,
              width: 1,
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 100,
              },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default ParticlesBackground;