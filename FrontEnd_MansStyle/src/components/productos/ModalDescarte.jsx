import React, { useState } from "react";
import { Modal } from "@rewind-ui/core";

const ModalDescarte = ({
  open,
  onClose,
  onConfirm,
  maxCantidad = 100,
  productoNombre = "",
}) => {
  const [cantidad, setCantidad] = useState(1);

  const handleChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 0) value = 0;
    if (value > maxCantidad) value = maxCantidad;
    setCantidad(value);
  };

  const handleIncrement = () => {
    setCantidad((prev) => (prev < maxCantidad ? prev + 1 : prev));
  };

  const handleDecrement = () => {
    setCantidad((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleConfirm = () => {
    onConfirm(cantidad);
    onClose();
    setCantidad(1);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        setCantidad(1);
      }}
      title="Descartar productos"
      size="l"
      className="bg-white text-blue-900 border border-blue-500 rounded-xl shadow-2xl p-6 grid grid-cols-2"
      transition={{ duration: 1.5 }}
      backdropBlur={false}
    >
      <p className="text-blue-800 text-lg text-center mb-6 col-span-2">
        ¿Cuántos productos deseas descartar?
        <br />
        <strong>{productoNombre}</strong>
      </p>
      <div className="flex items-center justify-center gap-4 col-span-2 mb-6">
        <button
          type="button"
          onClick={handleDecrement}
          className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-lg border border-blue-200 text-xl"
        >
          -
        </button>
        <input
          type="number"
          min={0}
          max={maxCantidad}
          value={cantidad}
          onChange={handleChange}
          className="w-20 text-center bg-white text-blue-900 rounded-lg px-2 py-2 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-lg border border-blue-200 text-xl"
        >
          +
        </button>
      </div>
      <div className="content-center justify-center flex gap-4 col-span-2">
        <button
          onClick={() => {
            onClose();
            setCantidad(1);
          }}
          className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-6 py-2 rounded-lg border border-blue-200 transition"
        >
          Cancelar
        </button>
        <button
          onClick={handleConfirm}
          className="bg-red-600 text-white hover:bg-red-700 px-6 py-2 rounded-lg transition"
        >
          Descartar
        </button>
      </div>
    </Modal>
  );
};

export default ModalDescarte;