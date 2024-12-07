"use client";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="text-xl font-bold text-gray-900">SUPABASE</div>

        <div className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/user-show" className="text-gray-700 hover:text-gray-900">
            User
          </Link>

          <Link href="/product-show" className="text-gray-700 hover:text-gray-900">
            Product
          </Link>
        </div>

        <div>
          <Link href="/user-form" className="pr-3">
            <button className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700">
              Add User
            </button>
          </Link>

          <Link href="/product-form">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700">
              Add Product
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
