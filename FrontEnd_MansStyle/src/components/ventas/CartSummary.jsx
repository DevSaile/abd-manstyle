import React, { useState } from "react";

const CartSummary = ({
  cartItems,
  updateCartItemQuantity,
  removeFromCart,
  amountGiven,
  setAmountGiven,
  amountError,
  setAmountError
}) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.Precio_Producto,
    0
  );
  const exchange = Math.max((parseFloat(amountGiven) || 0) - total, 0);
  return (
    <div className="space-y-4 overflow-y-auto bg-white rounded-xl border border-slate-300 ring-1 ring-blue-500/30 shadow-md p-8 w-full max-w-2xl mx-auto">
   {cartItems.map((item) => (
  <div
    key={item.ID_Producto}
    className="flex items-center justify-between bg-blue-50 p-2 rounded-lg border border-blue-100 gap-2"
  >
    {/* Imagen del producto (más pequeña) */}
    <div className="w-12 h-12 flex-shrink-0">
      <img
        src={item.url_image || "https://via.placeholder.com/100"}
        alt={item.Nombre}
        className="w-full h-full object-cover rounded-md border border-blue-200 bg-gray-100"
      />
    </div>

    {/* Detalles del producto (fuente más pequeña) */}
    <div className="flex-1 px-2 min-w-0">
      <h3 className="text-xs font-semibold text-blue-900 truncate">
        {item.Nombre}
      </h3>
      <p className="text-xs text-blue-700">
        C${item.Precio_Producto?.toFixed(2)}
      </p>
    </div>

    {/* Selector de cantidad (botones más pequeños, input más pequeño) */}
    <div className="flex items-center">
      <button
        className="bg-blue-100 text-blue-700 px-1 py-0.5 rounded-l hover:bg-blue-200 border border-blue-200 text-sm"
        onClick={() =>
          updateCartItemQuantity(
            item.ID_Producto,
            Math.max(item.quantity - 1, 1)
          )
        }
      >
        -
      </button>
      <input
        type="number"
        value={item.quantity || ""}
        onChange={(e) => {
          const newQuantity =
            e.target.value === "" ? "" : parseInt(e.target.value, 10);
          if (
            newQuantity === "" ||
            (!isNaN(newQuantity) && newQuantity >= 0)
          ) {
            updateCartItemQuantity(item.ID_Producto, newQuantity);
          }
        }}
        onBlur={() => {
          if (!item.quantity || item.quantity < 1) {
            updateCartItemQuantity(item.ID_Producto, 1);
          }
          if (item.quantity > item.Cantidad) {
            updateCartItemQuantity(item.ID_Producto, item.Cantidad);
          }
        }}
        className="w-10 text-center bg-white text-blue-900 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs"
        min="1"
        max={item.Cantidad}
      />
      <button
        className="bg-blue-100 text-blue-700 px-1 py-0.5 rounded-r hover:bg-blue-200 border border-blue-200 text-sm"
        onClick={() =>
          updateCartItemQuantity(
            item.ID_Producto,
            (item.quantity || 1) + 1,
           
          )
        }
  disabled={item.quantity >= item.Cantidad}

      >
        +
      </button>
    </div>

    {/* Botón eliminar (más pequeño, menos margen) */}
    <button
      className="text-red-500 hover:text-red-700 ml-2 text-base"
      onClick={() => removeFromCart(item.ID_Producto)}
    >
      ×
    </button>
  </div>
))}
      {/* Total */}
      <div className="border-t border-blue-200 pt-4 flex justify-between text-blue-900 font-semibold text-lg">
        <span>Total:</span>
        <span>C${total.toFixed(2)}</span>
      </div>

      {/* Monto dado */}
      <div className="mt-4">
        <label
          htmlFor="amountGiven"
          className="block text-blue-900 font-medium mb-2"
        >
          Monto recibido:
        </label>
        <input
          type="number"
          id="amountGiven"
          value={amountGiven}
 onChange={(e) => {
    setAmountGiven(e.target.value);
    if (amountError && e.target.value) {
      // Si hay error y el usuario escribe algo, quita el error visual
      setAmountGiven(e.target.value);
      if (parseFloat(e.target.value) > 0) {
        // Llama a setAmountError(false) si está disponible como prop
        if (typeof amountError !== "undefined" && typeof setAmountError === "function") {
          setAmountError(false);
        }
      }
    }
  }}           className={`w-full bg-white text-blue-900 rounded-lg px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    amountError ? "border-red-500 ring-1 ring-red-500" : "border-blue-200"
  }`}
          placeholder="Ingrese el monto entregado por el cliente"
        />
      </div>

      {/* Cambio */}
      <div className="mt-4 flex justify-between text-blue-900 font-semibold text-lg">
        <span>Cambio:</span>
        <span>C${exchange.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartSummary;