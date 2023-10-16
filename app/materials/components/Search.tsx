"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { HiSearch, HiShoppingCart } from "react-icons/hi";
import { CartContext } from "@/app/context/CartContext";
import CartModal from "./CartModal";

const Search = () => {
  const { cartItems } = useContext(CartContext);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isOpenCartModal, setIsOpenCartModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get("type");
    if (type) {
      setFilter(type);
    }

    setCartItemCount(cartItems.length);
  }, [cartItems]);

  const handleFilterChange = (event: any) => {
    //update query param
    setFilter(event.target.value);
    router.push(`/materials?type=${event.target.value}&search=${search}`);
  };

  const handleSearch = (event: any) => {
    //update query param
    setSearch(event.target.value);
    router.push(`/materials?search=${event.target.value}&type=${filter}`);
  };

  const handleCartModal = () => {
    setIsOpenCartModal(true);
  };

  const handleCartModalClose = () => {
    setIsOpenCartModal(false);
  };
  return (
    <div className="flex w-full">
      <div className="relative w-2/4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <HiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          className=" pl-10 pr-3 w-full py-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
          type="text"
          placeholder="Buscar . . ."
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="w-1/4 ml-4 ">
        <label htmlFor="filter" className="sr-only">
          Filtro
        </label>
        <select
          id="filter"
          name="filter"
          className="w-full py-2 pl-3pr-10text-base border-gray-300 sm:text-sm rounded-md"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="">Todos</option>
          <option value="didactic">Didáctico</option>
          <option value="electronic">Electrónico</option>
        </select>
      </div>
      <div className="w-1/4 flex relative self-center justify-end">
        <div className="absolute ">
          <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
            {cartItemCount}
          </p>
        </div>
        <HiShoppingCart onClick={handleCartModal} size={40}></HiShoppingCart>
      </div>
      <CartModal isOpen={isOpenCartModal} onClose={handleCartModalClose} />
    </div>
  );
};

export default Search;
