"use client";

import { useEffect } from "react";

function DeletePopProduct({
  deleteModel,
  setDeleteModel,
  onDelete,
  ProdIdToDelete,
}: any) {
  const toggleModal = () => setDeleteModel(!deleteModel);

  useEffect(() => {
    // This ensures that clicking outside the modal closes it
    const handleClickOutside = (event: MouseEvent) => {
      if ((event.target as HTMLElement).classList.contains("bg-gray-800")) {
        toggleModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [deleteModel]);

  return (
    <>
      {deleteModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-md h-auto bg-white rounded-lg shadow dark:bg-gray-800">
            {/* Modal Content */}
            <div className="relative p-4 text-center sm:p-5">
              <button
                type="button"
                className="absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 text-gray-400 rounded-lg text-sm p-1.5"
                onClick={toggleModal}
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
              <p className="mb-4 text-gray-500 dark:text-gray-300">
                Are you sure you want to delete this {ProdIdToDelete}?
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
                >
                  No, cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDelete(ProdIdToDelete);
                  }}
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeletePopProduct;
