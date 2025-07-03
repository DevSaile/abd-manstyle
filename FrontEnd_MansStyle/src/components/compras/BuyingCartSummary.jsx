import React from "react";

import { obtenerProductos } from "@/services/ProductosService";

const CartSummaryBuying = ({
  cartItems,
  updateCartItemQuantity,
  updateCartItemPrice,
  removeFromCart,
  priceLeft,
  setPriceLeft,
}) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.buyingPrice || 0),
    0
  );
  console.log("Cart Items:", cartItems);
  return (
    <div className="space-y-4 overflow-y-auto bg-white rounded-xl border border-slate-300 ring-1 ring-blue-500/30 shadow-md p-8 w-full">
      {cartItems.map((item) => (
        <div
          key={item.ID_Producto}
          className="flex items-center justify-between bg-blue-50 p-2 rounded-lg border border-blue-100 gap-2"
        >
          {/* Product Image (smaller) */}
          <div className="w-12 h-12 flex-shrink-0">
            <img
              src={item.url_image || "https://via.placeholder.com/100"}
              alt={item.Nombre}
              className="w-full h-full object-cover rounded-md border border-blue-200 bg-gray-100"
            />
          </div>

          {/* Product Details (smaller font) */}
          <div className="flex-1 px-2 min-w-0">
            <h3 className="text-xs font-semibold text-blue-900 truncate">
              {item.Nombre}
            </h3>
            <p className="text-xs text-blue-700 flex items-center">
              Precio de compra: C$
              <input
                type="number"
                value={
                  item.buyingPrice
                }
                onChange={(e) => {
                  const newPrice = parseFloat(e.target.value);
                  updateCartItemPrice(item.ID_Producto, newPrice);
                  // Si el precio es válido, desactiva el error visual
                  if (priceLeft) {
                    setPriceLeft(false);
                  }
                }}
                min="0"
                className={
                  "w-14 bg-white text-blue-900 border border-blue-200 rounded-lg px-1 py-0.5 focus:outline-none ml-1 text-xs " +
                  (priceLeft && !item.buyingPrice
                    ? "ring-2 ring-red-500 border-red-400"
                    : "focus:ring-2 focus:ring-blue-500")
                }
                placeholder="Precio"
              />{" "}
            </p>
          </div>

          {/* Quantity Selector (smaller buttons/input) */}
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
                // Ensure the quantity is at least 1 when the input loses focus
                if (!item.quantity || item.quantity < 1) {
                  updateCartItemQuantity(item.ID_Producto, 1);
                }
              }}
              className="w-10 text-center bg-white text-blue-900 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs"
              min="1"
            />
            <button
              className="bg-blue-100 text-blue-700 px-1 py-0.5 rounded-r hover:bg-blue-200 border border-blue-200 text-sm"
              onClick={() =>
                updateCartItemQuantity(item.ID_Producto, item.quantity + 1)
              }
            >
              +
            </button>
          </div>

          {/* Remove Button (smaller, less margin) */}
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
    </div>
  );
};

export default CartSummaryBuying;
