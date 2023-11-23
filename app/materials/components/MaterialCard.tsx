"use client";
import Button from "@/app/components/Button";
import { Material, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { HiSearch, HiShoppingCart, HiTrash } from "react-icons/hi";
import { CartContext } from "@/app/context/CartContext";
import { IoRemove } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import MaterialDetailModal from "./MaterialDetailModal";
import { toast } from "react-hot-toast";

interface MaterialWithUser extends Material {
  user: User;
}
interface MaterialCardProps {
  material: MaterialWithUser;
  currentUser: User;
}

const MaterialCard: React.FC<MaterialCardProps> = ({
  material,
  currentUser,
}) => {
  const router = useRouter();
  const { addToCart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddToCart = (item: Material) => {
    addToCart(item);
  };

  const handleRemoveMaterial = (item: Material) => {
    axios
      .delete(`/api/materials`, {
        headers: {
          "delete-id": item.id,
        },
      })
      .then((data) => {
        toast.error("Material eliminado");
      });
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow">
      <img
        className="rounded-lg w-full h-64 object-cover"
        src={material.image || "https://via.placeholder.com/300"}
        alt="material image"
        onClick={handleOpenModal}
      />
      <div className="px-5 pb-2 mt-3">
        <a href="#">
          <h5 className="text-xl font-bold tracking-tight text-gray-90">
            {material.name}
          </h5>
        </a>
        <p className="text-gray-500">Vendedor: {material.user.name}</p>
        <div className="flex items-center justify-between ">
          <span className="text-1xl font-bold text-gray-90">
            ${material.price} MXN
          </span>
          {(currentUser?.id !== material.userId && (
            <Button onClick={() => handleAddToCart(material)}>
              <HiShoppingCart size={20} className="self-center" />
            </Button>
          )) || (
            <Button
              onClick={() => handleRemoveMaterial(material)}
              danger={true}
            >
              <HiTrash size={20} className="self-center" />
            </Button>
          )}
        </div>
      </div>
      <MaterialDetailModal
        material={material}
        isOpen={isOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default MaterialCard;
