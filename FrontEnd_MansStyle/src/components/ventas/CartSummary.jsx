import React from "react";

const CartSummary = ({ cartItems, updateCartItemQuantity }) => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

    return (
        <div className="space-y-4">
            {cartItems.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
                >
                    {/* Product Image */}
                    <div className="w-16 h-16 flex-shrink-0">
                        <img
                            src={item.image || "https://via.placeholder.com/64"}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 px-4">
                        <h3 className="text-sm font-medium text-gray-100 truncate">
                            {item.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                            ${item.price.toFixed(2)}
                        </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center">
                        <button
                            className="bg-gray-600 text-gray-300 px-2 py-1 rounded-l-lg hover:bg-gray-500"
                            onClick={() =>
                                updateCartItemQuantity(item.id, Math.max(item.quantity - 1, 1))
                            }
                        >
                            -
                        </button>
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                                const newQuantity = parseInt(e.target.value, 10);
                                if (!isNaN(newQuantity)) {
                                    updateCartItemQuantity(
                                        item.id,
                                        Math.min(Math.max(newQuantity, 1), item.stock)
                                    );
                                }
                            }}
                            className="w-12 text-center bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none"
                            min="1"
                            max={item.stock}
                        />
                        <button
                            className="bg-gray-600 text-gray-300 px-2 py-1 rounded-r-lg hover:bg-gray-500"
                            onClick={() =>
                                updateCartItemQuantity(item.id, Math.min(item.quantity + 1, item.stock))
                            }
                        >
                            +
                        </button>
                    </div>
                </div>
            ))}
            <div className="border-t border-gray-600 pt-4 flex justify-between text-gray-100 font-semibold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
                
            </div>
        </div>
    );
};

export default CartSummary;