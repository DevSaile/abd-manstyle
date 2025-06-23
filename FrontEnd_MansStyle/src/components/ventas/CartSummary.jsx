import React, { useState } from "react";

const CartSummary = ({
  cartItems,
  updateCartItemQuantity,
  removeFromCart,
  amountGiven,
  setAmountGiven,
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
          className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100"
        >
          {/* Imagen del producto */}
          <div className="w-20 h-20 flex-shrink-0">
            <img
              src={item.url_image || "https://via.placeholder.com/150"}
              alt={item.Nombre}
              className="w-full h-full object-cover rounded-lg border border-blue-200 bg-gray-100"
            />
          </div>

          {/* Detalles del producto */}
          <div className="flex-1 px-6">
            <h3 className="text-base font-semibold text-blue-900 truncate">
              {item.Nombre}
            </h3>
            <p className="text-sm text-blue-700">
              ${item.Precio_Producto?.toFixed(2)}
            </p>
          </div>

          {/* Selector de cantidad */}
          <div className="flex items-center">
            <button
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-l-lg hover:bg-blue-200 border border-blue-200"
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
                  (!isNaN(newQuantity) &&
                    newQuantity >= 0 )
                ) {
                  updateCartItemQuantity(item.ID_Producto, newQuantity);
                }
              }}
              onBlur={() => {
                if (!item.quantity || item.quantity < 1) {
                  updateCartItemQuantity(item.ID_Producto, 1);
                }
                if(item.quantity > item.Cantidad){
                  updateCartItemQuantity(item.ID_Producto, item.Cantidad);
                }
              }}
              className="w-14 text-center bg-white text-blue-900 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              min="1"
              max={item.Cantidad}
            />
            <button
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-r-lg hover:bg-blue-200 border border-blue-200"
              onClick={() =>
                updateCartItemQuantity(
                  item.ID_Producto,
                  (item.quantity || 1) + 1
                )
              }
            >
              +
            </button>
          </div>

          {/* Botón eliminar */}
          <button
            className="text-red-500 hover:text-red-700 ml-6 text-lg"
            onClick={() => removeFromCart(item.ID_Producto)}
          >
            ×
          </button>
        </div>
      ))}

      {/* Total */}
      <div className="border-t border-blue-200 pt-4 flex justify-between text-blue-900 font-semibold text-lg">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
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
          onChange={(e) => setAmountGiven(e.target.value)}
          className="w-full bg-white text-blue-900 border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ingrese el monto entregado por el cliente"
        />
      </div>

      {/* Cambio */}
      <div className="mt-4 flex justify-between text-blue-900 font-semibold text-lg">
        <span>Cambio:</span>
        <span>${exchange.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartSummary;