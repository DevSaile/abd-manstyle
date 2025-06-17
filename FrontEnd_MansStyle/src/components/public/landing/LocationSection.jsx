import React, { useState, useEffect } from "react";
 
const LocationSection =  () => {
    return(

      <section className="py-16 mt-8 bg-[#18181b] rounded-xl shadow-lg mx-10">
        <div className=" mx-20 text-center">
          <h1 className="text-4xl font-bold mb-10 text-[#a78bfa]">
            Nuestras Sucursales
          </h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#23272f] rounded-lg shadow p-6 border border-[#313244]">
              <h2 className="text-2xl font-bold mb-4 text-[#2563eb]">
                Sucursal Unidad de Proposito
              </h2>
              <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg mb-4">
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243.7727987680513!2d-86.18387315030198!3d12.155550041774594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f73fc0dc0d95f47%3A0x1988b95898efe0fa!2s5R48%2B5FJ%2C%20Managua%2011042!5e0!3m2!1ses-419!2sni!4v1745190861916!5m2!1ses-419!2sni"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación"
                ></iframe>
              </div>
              <p className="text-gray-300">Dirección: Unidad de Proposito, Managua</p>
            </div>
            <div className="bg-[#23272f] rounded-lg shadow p-6 border border-[#313244]">
              <h2 className="text-2xl font-bold mb-4 text-[#2563eb]">
                Sucursal Americas 2
              </h2>
              <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg mb-4">
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d243.7672932153066!2d-86.18840531741803!3d12.161556183420084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDA5JzQxLjYiTiA4NsKwMTEnMTcuOSJX!5e0!3m2!1ses-419!2sni!4v1747719557643!5m2!1ses-419!2sni"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación 2"
                ></iframe>
              </div>
              <p className="text-gray-300">Dirección: Americas 2, Managua</p>
            </div>
          </div>
        </div>
      </section>
    )

}

export default LocationSection;