"use client"; // Add this line

import { supabase } from "@/lib/supabaseClient";
import React, { useEffect, useState } from "react";
import { Loader, Search } from "lucide-react";
import DeletePopUser from "./DeletePopUser";
import UpdatePopUser from "./UpdatePopUser";
import { toast } from "react-toastify";

const UserDetails = () => {
  const [userData, setUserData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteModel, setDeleteModel] = useState<boolean>(false);
  const [updateModel, setUpdateModel] = useState<boolean>(false);
  const [userIdToDelete, setUserIdToDelete] = useState<any>("");
  const [productData, setProductData] = useState<any>({});
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  const fetchUserDetails = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("user")
      .select("user_id, name, email, password");
    if (error) {
      console.log(error.message);
      setLoading(false);
    } else {
      console.log("data :>> ", data);
      setUserData(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const HandleTextSearch = async (e: any) => {
    const text = e.target.value.trim();

    let query = supabase.from("user").select("*");

    if (text === "") {
      query = query;
    } else if (!isNaN(Number(text))) {
      query = query.or(`user_id.eq.${text}`);
    } else {
      query = query.or(`name.ilike.%${text}%,email.ilike.%${text}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching data:", error.message);
    } else {
      setUserData(data);
    }
  };

  const handleUserDelete = async () => {
    const { data, error } = await supabase
      .from("user")
      .delete()
      .eq("user_id", userIdToDelete);
    if (error) {
      console.log("error.message :>> ", error.message);
    } else {
      setDeleteModel(!deleteModel);
      fetchUserDetails();
    }
  };

  const fetchUserProducts = async (userId: string) => {
    const { data, error } = await supabase
      .from("product")
      .select("product_id, name, category, price")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching products:", error.message);
    } else {
      setProductData((prevData: any) => ({
        ...prevData,
        [userId]: data,
      }));
    }
  };

  const toggleProductVisibility = (userId: string) => {
    if (expandedUserId === userId) {
      setExpandedUserId(null);
    } else {
      setExpandedUserId(userId);
      fetchUserProducts(userId);
    }
  };

  return (
    <>
      {deleteModel && (
        <DeletePopUser
          setDeleteModel={setDeleteModel}
          deleteModel={deleteModel}
          onDelete={handleUserDelete}
          userIdToDelete={userIdToDelete}
        />
      )}
      {updateModel && (
        <UpdatePopUser
          updateModel={updateModel}
          setUpdateModel={setUpdateModel}
          userToUpdate={userData.find(
            (user: any) => user.user_id === userIdToDelete
          )}
          onUpdate={() => {}}
        />
      )}

      <div className="container my-5 px-4">
        <h6 className="text-center font-bold py-4 text-xl text-gray-800 dark:text-white">
          User Details
        </h6>
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Search
          </div>
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full sm:max-w-sm">
            <div className="text-gray-500 dark:text-gray-400">
              <Search />
            </div>
            <input
              type="text"
              className="ml-2 w-full text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600 border-none focus:outline-none"
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
          userData &&
          userData.length > 0 && (
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-blue-50 dark:bg-blue-900">
                <tr>
                  {Object.keys(userData[0]).map((key) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 border-b"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 border-b">
                    Delete
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 border-b">
                    Product
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData &&
                  userData.map((user: any, index: number) => (
                    <React.Fragment key={user.user_id}>
                      <tr
                        className={`${
                          index % 2 === 0
                            ? "bg-white dark:bg-gray-700"
                            : "bg-gray-100 dark:bg-gray-600"
                        } hover:bg-blue-100 dark:hover:bg-blue-600 transition duration-300 ease-in-out`}
                      >
                        {/* Dynamically render user data */}
                        {Object.keys(user).map((key) => (
                          <td
                            key={key}
                            className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 border-b"
                          >
                            {user[key]}
                          </td>
                        ))}
                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 border-b">
                          <button
                            className="bg-red-600 rounded text-white px-5 py-1 hover:bg-red-700 dark:hover:bg-red-800 transition duration-300"
                            onClick={() => {
                              setUserIdToDelete(user.user_id);
                              setDeleteModel(true);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 border-b">
                          <button
                            className="bg-green-600 rounded text-white px-5 py-1 hover:bg-green-700 dark:hover:bg-green-800 transition duration-300"
                            onClick={() =>
                              toggleProductVisibility(user.user_id)
                            }
                          >
                            Product
                          </button>
                        </td>
                      </tr>

                      {expandedUserId === user.user_id &&
                        productData[user?.user_id || ""]?.length >= 1 &&
                        productData[user.user_id] && (
                          <tr>
                            <td
                              colSpan={Object.keys(user).length + 2}
                              className="px-6 py-4 bg-gray-200 dark:bg-gray-900 transition duration-300 ease-in-out"
                            >
                              <table className="min-w-full table-auto border-collapse">
                                <thead className="bg-blue-100 dark:bg-blue-700">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200 border-b">
                                      Product ID{" "}
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200 border-b">
                                      Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200 border-b">
                                      Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200 border-b">
                                      Price
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {productData[user.user_id].map(
                                    (product: any, index: number) => (
                                      <tr
                                        key={index}
                                        className={`${
                                          index % 2 === 0
                                            ? "bg-white dark:bg-gray-800"
                                            : "bg-gray-50 dark:bg-gray-700"
                                        } hover:bg-blue-50 dark:hover:bg-blue-600 transition duration-300 ease-in-out`}
                                      >
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 border-b">
                                          {product.product_id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 border-b">
                                          {product.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 border-b">
                                          {product.category}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 border-b">
                                          ${product.price}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </>
  );
};

export default UserDetails;
