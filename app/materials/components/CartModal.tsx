"use client";

import Modal from "@/app/components/modals/Modal";
import Button from "@/app/components/Button";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { CartContext } from "@/app/context/CartContext";
import { FiMessageCircle } from "react-icons/fi";
import { BsMessenger } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CartModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { cartItems, removeFromCart } = useContext(CartContext);

  const handleContactClick = (item: any) => {
    //Remove item from cart
    removeFromCart(item);

    axios.post("/api/conversations", { userId: item.userId }).then((data) => {
      router.push(
        `/conversations/${data.data.id}?message=Hola, me interesa tu producto ${item.name}`
      );
    });
  };

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
            Carrito de compras
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Agrega distintos materiales.
          </p>

          <div className="mt-10 flex flex-col gap-y-8">
            {cartItems.map((item) => (
              <div className="flex items-center justify-between" key={item.id}>
                <div className="flex items-center">
                  <Image
                    src={item.image || "https://via.placeholder.com/300"}
                    width={50}
                    height={50}
                    className="rounded-lg object-cover"
                    alt="material image"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Vendedor: {item.user.name}
                    </p>
                  </div>
                </div>
                <div className="text-end">
                  <p className="text-sm font-medium text-gray-900">
                    ${item.price} MXN
                  </p>
                  <div
                    className="flex justify-end mt-1 cursor-pointer"
                    onClick={() => handleContactClick(item)}
                  >
                    Contactar
                    <BsMessenger color="#0284c7" size={20} className="ml-3" />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">
                ${cartItems.reduce((a, b) => a + parseInt(b.price), 0)} MXN
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
