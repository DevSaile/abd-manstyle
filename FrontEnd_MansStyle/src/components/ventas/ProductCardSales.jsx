import { motion } from "framer-motion";
import { Image } from "lucide-react"; // Placeholder icon for the product image
import { Button } from "@rewind-ui/core";

const ProductCardSales = ({ name, Sucursal, price, brand, category, stock, image, onClick, onClickDelete }) => {
    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700"
            onClick={onClick} 
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
        >
            {/* Product Image */}
            <div className="h-3/5 bg-gray-700 flex items-center justify-center">
                {image ? (
                    <img src={image} alt={name} className="h-full w-full object-cover" />
                ) : (
                    <Image size={64} className="text-gray-400" />
                )}
            </div>

            {/* Product Details */}
            <div className="p-3 grid grid-cols-4">
                <h3 className="col-span-2 text-lg font-semibold text-gray-100 truncate">{name}</h3>
                    
                
                <div className="mt-2 text-sm text-gray-400">
                    <p>
                        <span className="font-medium text-gray-300">Esta en:</span> {Sucursal}
                    </p>
                    <p>
                        <span className="font-medium text-gray-300">Price:</span> ${price}
                    </p>
                    <p>
                        <span className="font-medium text-gray-300">Brand:</span> {brand}
                    </p>
                    <p>
                        <span className="font-medium text-gray-300">Category:</span> {category}
                    </p>
                    <p>
                        <span className="font-medium text-gray-300">Stock:</span> {stock}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCardSales;