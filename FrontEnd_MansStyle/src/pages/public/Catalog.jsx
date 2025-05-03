import React from 'react'
import CatalogProductCard from '../../components/public/catalog/CatalogProductCard'
import Navbar from '../../components/public/landing/Navbar';
import { obtenerProductos,
  obtenerProductoPorID
 } from '../../services/ProductosService';
 import { useState, useEffect } from 'react';




const Catalog = () => {
  
  const [products, setProducts] = useState([]);

   useEffect(() => {
      obtenerProductos().then((data) => {
        setProducts(data);
      });
    }, []);

  return (

    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-32 mb-8 mx-5">
      <Navbar />
      {products.map((product) => (
        <CatalogProductCard
          key={product.ID_Producto}
          name={product.Nombre}
          price={product.Precio_Producto}
          image={
            product.url_image
               ? product.url_image
               : "https://via.placeholder.com/150"
           }         />
        
      ))}
   
  

    </div>
  );
};

export default Catalog;