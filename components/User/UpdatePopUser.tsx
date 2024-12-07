"use client";

import { useEffect, useState } from "react";

function UpdatePopUser({
  updateModel,
  setUpdateModel,
  onUpdate,
  userToUpdate,
}: any) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userToUpdate) {
      setFormData({
        name: userToUpdate.name || "",
        email: userToUpdate.email || "",
        password: userToUpdate.password || "",
      });
    }
  }, [userToUpdate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleClose = () => {setUpdateModel(false)};

  return (
    <>
      {updateModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-md h-auto bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="relative p-4 sm:p-5">
              <button
                type="button"
                className="absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 text-gray-400 rounded-lg text-sm p-1.5"
                onClick={handleClose}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Update User
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onUpdate(formData);
                }}
              >
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="py-2 px-4 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdatePopUser;
