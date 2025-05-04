import { motion } from "framer-motion";
import { Image } from "lucide-react"; // Placeholder icon for the product image
import { Button } from "@rewind-ui/core";
import { useState } from "react";

const ExampleCard = ({ image, Description }) => {
    return (
        <motion.div
            className="overflow-hidden shadow-lg rounded-xl h-72"
        >
            {/* Product Image */}
            <div className="h-1/2 flex items-center justify-center mb-4">
                {image ? (
                    image

) : (
                    <Image size={64} className="text-gray-400" />
                )}
            </div>

            {/* Product Details */}
            <div className="p-3 grid grid-cols-flow grid-rows-4">
                <h3 className="text-lg font-semibold text-gray-100 truncate">{Description}</h3>
            </div>
        </motion.div>
    );
};

export default ExampleCard;