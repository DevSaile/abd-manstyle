import { motion } from "framer-motion";
import { Image } from "lucide-react"; // Placeholder icon for the product image
import { Button } from "@rewind-ui/core";

const ProductCard = ({ name, price, category, stock, image, onClick}) => {
    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 h-72"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
            onClick={onClick}
        >
            {/* Product Image */}
            <div className="h-1/2 bg-gray-700 flex items-center justify-center">
                {image ? (
                    <img src={image} alt={name} className="h-full w-full object-cover" />
                ) : (
                    <Image size={64} className="text-gray-400" />
                )}
            </div>

            {/* Product Details */}
            <div className="p-3 grid grid-cols-flow grid-rows-4">
                <h3 className="text-lg font-semibold text-gray-100 truncate">{name}</h3>
              
                
                   
                    <p>
                        <span className="font-medium font text-s text-gray-300">Precio:</span> <strong className='text-s'>${price}</strong>
                    </p>
                 
                    <p>
                        <span className="font- text-s text-gray-300">Categoria:</span> <strong className="text-s">{category}</strong>
                    </p>
                    <p>
                        <span className="font-medium text-s text-gray-300">Existencias:</span> <strong className="text-s">{stock}</strong>
                    </p>
            </div>
        </motion.div>
    );
};

export default ProductCard;