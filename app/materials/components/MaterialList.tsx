"use client";

import { Material, User } from "@prisma/client";
import MaterialCard from "./MaterialCard";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

interface MaterialListProps {
  currentUser: User;
}

interface MaterialWithUser extends Material {
  user: User;
}

const MaterialList: React.FC<MaterialListProps> = ({ currentUser }) => {
  const [materials, setMaterials] = useState<MaterialWithUser[]>([]);
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");
  const filter = searchParams?.get("type");

  const getMaterials = async () => {
    const response = await fetch(
      `/api/materials?search=${search}&filter=${filter}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setMaterials(data);
  };

  useEffect(() => {
    getMaterials();
  }, [search, filter]);

  return (
    <div className="grid my-10 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-gray-100 justify-items-center pb-20">
      {materials.map((material) => (
        <MaterialCard
          key={material.id}
          material={material}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default MaterialList;
