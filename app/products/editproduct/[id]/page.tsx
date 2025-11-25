'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState({ title: '', price: '', description: '', image: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch('/api/products');
      const data = await res.json();
      const prod = data.find((p) => p.id.toString() === params.id);
      if (prod) setProduct(prod);
      setLoading(false);
    }
    fetchProduct();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: params.id, ...product })
    });
    router.push('/products'); // go back to list
  };

  if (loading) return <p>Loading...</p>;

  return (
   <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 p-8 font-sans">
      {/* Header */}
      <div className="w-full max-w-md relative mb-6">
        <h1 className="text-3xl font-bold text-black text-center">Edit Product</h1>
        {/* Back button */}
        <button
          onClick={() => router.push('/products')}
          className="absolute top-0 right-0 p-2 hover:bg-gray-200 rounded-full transition"
        >
          <X className="w-6 h-6 text-black cursor-pointer" />
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={product.title}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
