import React from "react";

import { obtenerProductos } from "../../services/ProductosService";


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
    <div className="space-y-4 overflow-y-auto">
      {cartItems.map((item) => (
        <div
          key={item.ID_Producto}
          className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
        >
          {/* Product Image */}
          <div className="w-16 h-16 flex-shrink-0">
            <img
              src={item.url_image || "https://via.placeholder.com/150"}
              alt={item.Nombre}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 px-4">
            <h3 className="text-sm font-medium text-gray-100 truncate">
              {item.Nombre}
            </h3>
            <p className="text-sm text-gray-400">
              Precio de compra: $
              <input
                type="number"
                value={item.buyingPrice || ""}
                onChange={(e) => {
                  const newPrice = parseFloat(e.target.value) || 0;
                  updateCartItemPrice(item.ID_Producto, newPrice);
                }}
                className="w-20 bg-gray-800 text-gray-100 border border-gray-600 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Precio"
              />
            </p>
          </div>

          {/* Quantity Selector */}
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
              className="w-12 text-center bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none"
              min="1"
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

          {/* Remove Button */}
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
    </div>
  );
};

export default CartSummaryBuying;