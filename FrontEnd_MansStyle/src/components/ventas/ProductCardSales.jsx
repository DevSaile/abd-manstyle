import { motion } from "framer-motion";
import { Image } from "lucide-react"; // Placeholder icon for the product image
import { Button } from "@rewind-ui/core";

const ProductCardSales = ({ name, Sucursal, price, brand, category, stock, image, onClick, onClickDelete }) => {
    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 flex "
            onClick={onClick}
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
        >
            {/* Product Image */}
            <div className="w-1/3 bg-gray-700 flex items-center justify-center">
                {image ? (
                    <img src={image} alt={name} className="h-full w-full object-cover rounded-l-xl" />
                ) : (
                    <Image size={64} className="text-gray-400" />
                )}
            </div>

            {/* Product Details */}
            <div className="w-1/2 p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-100 truncate">{name}</h3>
                    <p className="text-sm text-gray-400 mt-2">
                        C${price}
                    </p>
                </div>
             
            </div>
        </motion.div>
    );
};

export default ProductCardSales;