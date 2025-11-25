"use client";
import { useState , useEffect } from "react";
import React from 'react'

export default function page() {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });


  async function addproducts(e){
    e.preventDefault();

    const response = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    console.log(data);
      setProduct({
    title: "",
    price: "",
    description: "",
    image: "",
  });
  }

  const handlechange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  

   
  return (
   <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-8 mt-10">
  <h1 className="text-3xl font-bold mb-6 text-center text-black">Add Product</h1>

  <form onSubmit={addproducts} className="space-y-4">
    <input
    onChange={handlechange}
      value={product.title}
      type="text"
      name="title"
      placeholder="title"
      className="w-full text-black p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
    onChange={handlechange}
    value={product.price}
      type="text"
      name="price"
      placeholder="price"
      className="w-full p-3 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
    onChange={handlechange}
    value={product.description}
      type="text"
      name="description"
      placeholder="Password"
      className="w-full p-3 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Add Product
    </button>
  </form>
</div>

  )
}
