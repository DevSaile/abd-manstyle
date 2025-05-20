import React from "react";

const CatalogProductCard = ({ name, price, image }) => {
  return (
    <div className="bg-transparent border border-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300">
      {/* Product Image */}
      <div className="w-full h-4/5 bg-gray-800 rounded-lg overflow-hidden mb-4">
        <img
          src={image || "https://via.placeholder.com/150"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Name */}
      <h3 className="text-lg font-semibold text-gray-100 truncate">{name}</h3>

      {/* Product Price */}
      <p className="text-sm text-gray-300 mt-2 mb-3">
        <span className="font-medium">Precio:</span> <strong>C${price}</strong>
      </p>
    </div>
  );
};

export default CatalogProductCard;