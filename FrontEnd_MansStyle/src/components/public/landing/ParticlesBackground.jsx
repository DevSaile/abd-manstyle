import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull} from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    // Correct way to initialize the tsParticles engine
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // Optional: You can log or manipulate the container if needed
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent", // Transparent background
          },
        },
        fullScreen: {
          enable: true,
          zIndex: 0,
        },
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: { min: 1, max: 5 },
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            outModes: {
              default: "bounce",
              
            },
          },
          links: { // Add this block for connecting lines
            enable: true,
            distance: 130, // Maximum distance for particles to connect
            color: "#ffffff", // Line color
            opacity: 0.4, // Line opacity
            width: 1, // Line width
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
  );
};

export default ParticlesBackground;
