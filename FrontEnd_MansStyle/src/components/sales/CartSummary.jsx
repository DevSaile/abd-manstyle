import React from "react";

const CartSummary = ({ cartItems }) => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

    return (
        <div className="space-y-4">
            {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-300">
                    <span>
                        {item.name} (x{item.quantity})
                    </span>
                    <span>${(item.quantity * item.price).toFixed(2)}</span>
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