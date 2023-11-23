"use client";

import Modal from "@/app/components/modals/Modal";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { CartContext } from "@/app/context/CartContext";
import { FiMessageCircle } from "react-icons/fi";
import { BsMessenger, BsTrash } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";

interface MaterialDetailModalProps {
  isOpen?: boolean;
  onClose: () => void;
  material: any;
}

const MaterialDetailModal: React.FC<MaterialDetailModalProps> = ({
  isOpen,
  onClose,
  material,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-12">
        <div className="border-gray-900/10 pb-12">
          <h2
            className="
                            text-base 
                            font-semibold 
                            leading-7 
                            text-gray-900
                        "
          >
            {material.name}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Descripción: {material.description}
          </p>

          <div className="mt-10 flex flex-col gap-y-8">
            <div
              className="flex items-center justify-between"
              key={material.id}
            >
              <div className="flex items-center">
                <Image
                  src={material.image || "https://via.placeholder.com/300"}
                  width={150}
                  height={150}
                  className="rounded-lg object-cover"
                  alt="material image"
                />
                <div className="ml-4">
                  <p className="text-sm font-semibold text-gray-900">
                    Vendedor
                  </p>
                  <p className="text-sm">{material.user.name}</p>
                  <p className="text-sm font-semibold text-gray-900">Correo</p>
                  <p className="text-sm truncate">{material.user.email}</p>
                </div>
              </div>
              {/* <div className="flex items-center gap-x-2">
                <Button>
                  <BsMessenger className="w-5 h-5" />
                  Contactar
                </Button>
                <Button danger>
                  <BsTrash className="w-5 h-5" />
                  Eliminar
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MaterialDetailModal;
