"use client";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Page() {
    const [remove, setRemove] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  // Load products from API
  const getProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartitems")) || [];
    setCartItems(savedCart);

    getProducts();
  }, []);



    

  const handelremove = (id) => {
    const updatedCart = cartItems.filter((item) => item !== id);
    localStorage.setItem("cartitems", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };


  const cartProducts = products.filter((p) => cartItems.includes(p.id));

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-black dark:text-white">
        My Cart
      </h1>

      {cartProducts.length === 0 ? (
        <p className="text-gray-500 text-lg mt-6">Your cart is empty.</p>
      ) : (
        <ul className="w-full max-w-md space-y-4">
         {cartProducts.map((item) => (
  <li
    key={item.id}
    className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition flex items-center justify-between"
  >
    {/* Left Side: Title + Description */}
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold text-black dark:text-white">
        {item.title}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        {item.description}
      </p>
    </div>

    {/* Trash Icon */}
    <button onClick={() => handelremove(item.id)} className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition">
      <Trash2 className="text-red-600 dark:text-red-400 w-5 h-5 cursor-pointer" />
    </button>
  </li>
))}

        </ul>
      )}
    </div>
  );
}