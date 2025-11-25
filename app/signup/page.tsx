"use client";


import { useState , useEffect } from "react";

import React from 'react'

export default function page() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [form , setForm] = useState({username: '', email: '', password: ''});
   async function handlesubmit (e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
      setForm({username: '', email: '', password: ''});
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
   }


   const handlechange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
   };
    

   if (loading) return <p>Loading...</p>;
   if (error) return <p>{error}</p>;


  return (
    <>
  <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 p-8 font-sans">
    <h1 className="text-4xl font-bold mb-6 text-black">Sign Up</h1>

    <form onSubmit={handlesubmit} className="w-full max-w-md space-y-4 text-black bg-white p-6 rounded-xl shadow-md">
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handlechange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handlechange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handlechange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Sign Up
      </button>
    </form>
  </div>
</>

  )
}
