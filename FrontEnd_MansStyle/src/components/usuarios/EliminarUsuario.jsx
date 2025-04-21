import React from 'react';
import { Modal } from '@rewind-ui/core';

const DeleteModal = ({ open, onClose, onConfirm, selectedUser }) => {
  const handleDelete = () => {
    onConfirm(); // Ejecuta la función de confirmación
    onClose();   // Cierra el modal
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Confirmar Eliminación"
      size="md"
      className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg shadow-2xl p-6"
    >
      <div className="space-y-4">
        <p className="text-gray-300 text-lg text-center">
          ¿Estás seguro que deseas eliminar al usuario{" "}
          <strong className="text-white">{selectedUser?.Nombre || 'seleccionado'}</strong>?
        </p>
        
        {selectedUser?.correo && (
          <p className="text-gray-400 text-sm text-center">
            Correo: {selectedUser.correo}
          </p>
        )}

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={onClose}
            className="bg-gray-700 text-gray-300 hover:bg-gray-600 px-6 py-2 rounded-lg transition duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-gray-100 hover:bg-red-500 px-6 py-2 rounded-lg transition duration-200"
          >
            Confirmar Eliminación
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;