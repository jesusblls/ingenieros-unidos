"use client";

import Modal from "@/app/components/modals/Modal";
import Button from "@/app/components/Button";
import React, { useState } from "react";
import Input from "@/app/components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Select from "@/app/components/inputs/Select";

interface AddMaterialModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const AddMaterialModal: React.FC<AddMaterialModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image: "",
      type: "",
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result.info.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/materials", data)
      .then((data) => {
        onClose();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => {
        setIsLoading(false);
        toast.success("¡Material agregado!");
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2
              className="
                text-base 
                font-semibold 
                leading-7 
                text-gray-900
              "
            >
              Material
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Agrega un nuevo material.
            </p>

            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Nombre"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <Input
                disabled={isLoading}
                label="Descripción"
                id="description"
                errors={errors}
                required
                register={register}
              />
              <Input
                disabled={isLoading}
                label="Precio"
                id="price"
                type="number"
                errors={errors}
                required
                register={register}
              />
              <Select
                label="Tipo"
                options={[
                  { label: "Didáctico", value: "didactic" },
                  { label: "Electrónico", value: "electronic" },
                ]}
                onChange={({ value }) =>
                  setValue("type", value, { shouldValidate: true })
                }
                multi={false}
              />
              <div>
                <label
                  htmlFor="photo"
                  className="
                    block 
                    text-sm 
                    font-medium 
                    leading-6 
                    text-gray-900
                  "
                >
                  Foto
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="yoffuipx"
                  >
                    <Button disabled={isLoading} secondary type="button">
                      <Image
                        width={80}
                        height={80}
                        src={image || "/images/placeholder-image.svg"}
                        alt="Avatar"
                      />
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="
            mt-6 
            flex 
            items-center 
            justify-end 
            gap-x-6
          "
        >
          <Button disabled={isLoading} secondary onClick={onClose}>
            Cancelar
          </Button>
          <Button disabled={isLoading} type="submit">
            Guardar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddMaterialModal;
