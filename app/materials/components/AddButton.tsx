"use client";

import AddMaterialModal from "./AddMaterialModal";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

const AddButton = () => {
  const [isOpenMaterialModal, setIsOpenMaterialModal] = useState(false);

  const handleAddMaterial = () => {
    setIsOpenMaterialModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenMaterialModal(false);
  };
  return (
    <>
      <button
        onClick={handleAddMaterial}
        className="flex fixed bottom-4 mb-14 md:mb-0 right-4 bg-blue-500 hover:bg-blue-700 p-2 text-white font-bold rounded"
      >
        <span className="hidden md:inline-block">Agregar</span>
        <FiPlus className="ml-0 md:ml-1 inline-block" size={20} />
      </button>
      <AddMaterialModal
        isOpen={isOpenMaterialModal}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default AddButton;
