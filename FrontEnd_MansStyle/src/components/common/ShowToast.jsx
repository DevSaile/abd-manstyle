import { useEffect } from "react";
import { useToast, ToastContainer } from "@rewind-ui/core";

/**
 * ShowToast
 * 
 * Props:
 * - message: string (mensaje a mostrar)
 * - iconType: string (tipo de icono, ej: "success", "error", "info", "warning")
 * - shadowColor: string (color de sombra, ej: "green", "red")
 * - tone: string (tono, ej: "solid", "light")
 * - show: boolean (si debe mostrarse el toast)
 * - delay: number (milisegundos de espera antes de mostrar el toast, default: 300)
 * - position: string (posición del ToastContainer, default: "top-right")
 */
export const ShowToast = ({
  message = "Producto agregado correctamente",
  iconType = "success",
  color = "green",
  tone = "solid",
  show = false,
  delay = 300,
  position = "bottom-right",
  onClose, // opcional: callback cuando se muestra el toast
}) => {
  const toast = useToast();

  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        toast.add({
          iconType,
          description: message,
          color,
          tone,
        });
        if (onClose) onClose();
      }, delay);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return <ToastContainer position={position} />;
};

export default ShowToast;