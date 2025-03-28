import React from "react";

export default function DeleteModal({ user, onClose, onDelete, loading }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete <strong>{user.first_name} {user.last_name}</strong>?</p>
        <div className="flex sm:flex-row flex-col gap-4 justify-center mt-4">
          <button onClick={() => onDelete(user.id)} disabled={loading} className="p-2 bg-red-500 text-white rounded-lg">
            {loading ? "Deleting..." : "Delete"}
          </button>
          <button onClick={onClose} className="p-2 bg-gray-300 rounded-lg">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
