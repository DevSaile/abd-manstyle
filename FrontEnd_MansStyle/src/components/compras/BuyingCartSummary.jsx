import React from "react";

import { obtenerProductos } from "@/services/ProductosService";

const CartSummaryBuying = ({
  cartItems,
  updateCartItemQuantity,
  updateCartItemPrice,
  removeFromCart,
}) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.buyingPrice || 0),
    0
  );

  return (
    <div className="space-y-4 overflow-y-auto bg-white rounded-xl border border-slate-300 ring-1 ring-blue-500/30 shadow-md p-8 w-full">
      {cartItems.map((item) => (
        <div
          key={item.ID_Producto}
          className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100"
        >
          {/* Product Image */}
          <div className="w-20 h-20 flex-shrink-0">
            <img
              src={item.url_image || "https://via.placeholder.com/150"}
              alt={item.Nombre}
              className="w-full h-full object-cover rounded-lg border border-blue-200 bg-gray-100"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 px-6">
            <h3 className="text-base font-semibold text-blue-900 truncate">
              {item.Nombre}
            </h3>
            <p className="text-sm text-blue-700">
              Precio de compra: $
              <input
                type="number"
                value={item.buyingPrice || ""}
                onChange={(e) => {
                  const newPrice = parseFloat(e.target.value) || 0;
                  updateCartItemPrice(item.ID_Producto, newPrice);
                }}
                className="w-20 bg-white text-blue-900 border border-blue-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
                placeholder="Precio"
              />
            </p>
          </div>

          {/* Quantity Selector */}
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
                  (!isNaN(newQuantity) && newQuantity >= 0)
                ) {
                  updateCartItemQuantity(item.ID_Producto, newQuantity);
                }
              }}
              onBlur={() => {
                // Ensure the quantity is at least 1 when the input loses focus
                if (!item.quantity || item.quantity < 1) {
                  updateCartItemQuantity(item.ID_Producto, 1);
                }
              }}
              className="w-14 text-center bg-white text-blue-900 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              min="1"
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

          {/* Remove Button */}
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
    </div>
  );
};

export default CartSummaryBuying;