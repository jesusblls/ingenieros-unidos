"use client";

import { HiPlusCircle } from "react-icons/hi";
import AddMaterialModal from "./AddMaterialModal";
import { useState } from "react";

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
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Agregar <HiPlusCircle className="inline-block " />
      </button>
      <AddMaterialModal
        isOpen={isOpenMaterialModal}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default AddButton;
