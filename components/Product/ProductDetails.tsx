"use client"; // Add this line

import { supabase } from "@/lib/supabaseClient";
import React, { useEffect, useState } from "react";
import { Loader, Search } from "lucide-react";
import DeletePopProduct from "./DeletePopProduct";

const ProductDetails = () => {
  const [ProductData, setProductData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteModel, setDeleteModel] = useState<boolean>(false);
  const [ProdIdToDelete, setProdIdToDelete] = useState<any>("");

  const fetchProductDetails = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("product")
      .select("product_id,user_id, name, category, price ");
    if (error) {
      console.log(error.message);
      setLoading(false);
    } else {
      console.log("data :>> ", data);
      setProductData(data);
      setLoading(false);
    }
  };
  const HandleTextSearch = async (e: any) => {
    console.log("e :>> ", e.target.value);
    const text = e.target.value;

    let query = supabase.from("product").select("*");

    if (text.trim() === "") {
      query = query;
    } else if (!isNaN(Number(text)) && text.trim() !== "") {
      query = query.or(`price.eq.${text}`);
    } else {
      query = query.or(`name.ilike.%${text}%,category.ilike.%${text}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching data:", error.message);
    } else {
      setProductData(data);
      console.log("Search Results:", data);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const handleUserDelete = async () => {
    const { data, error } = await supabase
      .from("product")
      .delete()
      .eq("product_id", ProdIdToDelete);
    if (error) {
    } else {
      setDeleteModel(!deleteModel);
      fetchProductDetails();
    }
  };

  return (
    <>
      {deleteModel && (
        <DeletePopProduct
          setDeleteModel={setDeleteModel}
          deleteModel={deleteModel}
          onDelete={handleUserDelete}
          ProdIdToDelete={ProdIdToDelete}
        />
      )}
      <div className="container my-5 px-4 ">
        <h6 className="text-center font-bold py-4 text-xl">Product Details</h6>
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 p-4 bg-white shadow-md rounded-lg">
          <div className="text-lg font-semibold text-gray-700">Search</div>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full sm:max-w-sm">
            <div className="text-gray-500">
              <Search />
            </div>
            <input
              type="text"
              className="ml-2 w-full text-sm text-gray-700 placeholder-gray-400 border-none focus:outline-none"
              placeholder="Search..."
              onChange={HandleTextSearch}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center mt-[60px] items-center w-full h-full">
            <Loader className="animate-spin w-8 h-8" />
          </div>
        ) : (
          ProductData &&
          ProductData.length > 0 && (
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  {Object.keys(ProductData[0]).map((key) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b"
                    >
                      {key.charAt(0) + key.slice(1)}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {ProductData.map((prod: any, index: number) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-200 transition duration-200`}
                  >
                    {/* Dynamically render prod data */}
                    {Object.keys(prod).map((key) => (
                      <td
                        key={key}
                        className="px-6 py-4 text-sm text-gray-700 border-b"
                      >
                        {prod[key]}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-sm text-gray-700 border-b">
                      <button
                        className="bg-blue-600 rounded text-white px-5 py-1"
                        onClick={() => {
                          setProdIdToDelete(prod.product_id);
                          setDeleteModel(true);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </>
  );
};

export default ProductDetails;
