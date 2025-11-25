'use client';
import React, { useState, useEffect } from 'react';
import { Edit, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session , status } = useSession();
  const [cartitems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const router = useRouter();


  const user = session?.user;

  async function getProducts() {
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    getProducts();

    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cartitems")) || [];
    setCartItems(savedCart);
  }, []);

  const handleEdit = (product) => {
    router.push(`/products/editproduct/${product.id}`);
  };

  // Add to Cart Function
  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cartitems")) || [];

    if (!existingCart.includes(product.id)) {
      existingCart.push(product.id);
    } 

    localStorage.setItem("cartitems", JSON.stringify(existingCart));
    setCartItems(existingCart);
    console.log("Updated Cart:", existingCart);
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 dark:bg-black font-sans p-8">
      <h1 className="text-4xl font-bold mb-6 text-black dark:text-white">
        PRODUCTS
      </h1>

      {/* Shopping Cart Button */}
      <button onClick={()=> router.push('/products/cart')} className="p-2 mb-6 bg-white dark:bg-gray-800 rounded-full shadow hover:shadow-lg transition">
        <ShoppingCart className="w-6 h-6 text-black dark:text-white cursor-pointer" />
      </button>

      {products.length === 0 ? (
        <p className="text-gray-500 mt-4">No products found.</p>
      ) : (
        <ul className="space-y-3 w-full max-w-md">
          {products.map((item) => (
            <li
              key={item.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow flex justify-between items-center hover:shadow-md transition"
            >
              <span className="font-medium text-black dark:text-white">
                {item.title}
              </span>

              <div className="flex items-center gap-3">
                <Edit
                  onClick={() => handleEdit(item)}
                  className="w-5 h-5 cursor-pointer text-blue-500 hover:text-blue-700 transition"
                />

                {/* Add to Cart */}
<button
  onClick={() => addToCart(item)}
  aria-label={`Add ${item.title} to cart`}
  className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
>
  Add to Cart
</button>

              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}