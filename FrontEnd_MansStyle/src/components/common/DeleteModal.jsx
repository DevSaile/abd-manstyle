import React from "react";
import { Modal } from "@rewind-ui/core";
const DeleteModal = ({
  open,
  onClose,
  ObjectName,
  ObjectProperName,
  DeleteLogic,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Confirm Delete"
      size="l" // Make the modal larger
      className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg shadow-2xl p-6 grid grid-cols-2" // Consistent styles
      transition={{ duration: 1.5 }} // Slower animation
      backdropBlur={false}
    >
      <p className="text-gray-300 text-lg text-center mb-6 col-span-2">
        Estas seguro de eliminar el siguiente elemento? <br />
        <strong>
          {ObjectName}: {ObjectProperName}
        </strong>
      </p>
      <div className="content-center justify-center flex gap-4 col-span-2">
        <button
          onClick={onClose} // Close the modal without action
          className="bg-gray-700 text-gray-300 hover:bg-gray-600 px-6 py-2 rounded-lg transition duration-200"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onClose(); // Close the modal
            DeleteLogic();
          }}
          className="bg-red-600 text-gray-100 hover:bg-red-500 px-6 py-2 rounded-lg transition duration-200"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
