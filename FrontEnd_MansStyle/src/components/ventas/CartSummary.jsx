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
    <div className="space-y-4 overflow-y-auto">
      {cartItems.map((item) => (
        <div
          key={item.ID_Producto}
          className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
        >
          {/* Imagen del producto */}
          <div className="w-16 h-16 flex-shrink-0">
            <img
              src={item.url_image || "https://via.placeholder.com/150"}
              alt={item.Nombre}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Detalles del producto */}
          <div className="flex-1 px-4">
            <h3 className="text-sm font-medium text-gray-100 truncate">
              {item.Nombre}
            </h3>
            <p className="text-sm text-gray-400">
              ${item.Precio_Producto?.toFixed(2)}
            </p>
          </div>

          {/* Selector de cantidad */}
          <div className="flex items-center">
            <button
              className="bg-gray-600 text-gray-300 px-2 py-1 rounded-l-lg hover:bg-gray-500"
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
                    newQuantity >= 0 ) // Ensure quantity is within the stock limit
                ) {
                  updateCartItemQuantity(item.ID_Producto, newQuantity);
                }
              }}
              onBlur={() => {
                // Ensure the quantity is at least 1 when the input loses focus
                if (!item.quantity || item.quantity < 1) {
                  updateCartItemQuantity(item.ID_Producto, 1);
                }
                if(item.quantity > item.Cantidad){
                  updateCartItemQuantity(item.ID_Producto, item.Cantidad);
                }

              }}
              className="w-12 text-center bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none"
              min="1"
              max={item.Cantidad}
            />
            <button
              className="bg-gray-600 text-gray-300 px-2 py-1 rounded-r-lg hover:bg-gray-500"
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
            className="text-red-500 hover:text-red-700 ml-4"
            onClick={() => removeFromCart(item.ID_Producto)}
          >
            x
          </button>
        </div>
      ))}

      {/* Total */}
      <div className="border-t border-gray-600 pt-4 flex justify-between text-gray-100 font-semibold">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {/* Monto dado */}
      <div className="mt-4">
        <label
          htmlFor="amountGiven"
          className="block text-gray-100 font-medium mb-2"
        >
          Monto recibido:
        </label>
        <input
          type="number"
          id="amountGiven"
          value={amountGiven}
          onChange={(e) => setAmountGiven(e.target.value)}
          className="w-full bg-gray-800 text-gray-100 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese el monto entregado por el cliente"
        />
      </div>

      {/* Cambio */}
      <div className="mt-4 flex justify-between text-gray-100 font-semibold">
        <span>Cambio:</span>
        <span>${exchange.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartSummary;
