import React from "react";

const CatalogProductCard = ({ name, price, image }) => {
  return (
   <div className="bg-transparent border border-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300">
  {/* Product Image */}
  <div className="w-full h-44 bg-gray-800 rounded-lg overflow-hidden mb-4">
    {image ? (
      <img
        src={image}
        className="w-full h-full object-cover"
        alt={name}
      />
    ) : (
      <div className="flex items-center justify-center w-full h-full text-gray-500 text-center p-4">
        No hay imagen disponible
      </div>
    )}
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