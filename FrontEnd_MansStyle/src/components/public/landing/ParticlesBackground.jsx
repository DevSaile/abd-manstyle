import { loadFull } from "tsparticles";
import { useCallback } from "react";
import Particles from "react-tsparticles";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
    console.log("workinggg");
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false }, // Importante para no tomar toda la pantalla
        background: {
          color: {
            value: "transparent"
          }
        },
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: 3 },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#888",
            opacity: 0.4,
            width: 1
          },
          move: { enable: true, speed: 2 }
        },
        interactivity: {
          events: { onhover: { enable: true, mode: "grab" } }
        },
        retina_detect: true
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0
      }}
    />
  );
};

export default ParticlesBackground;
