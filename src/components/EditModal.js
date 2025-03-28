import React, { useEffect, useState } from "react";

export default function EditModal({ user, onClose, onUpdate, loading }) {
  const [formData, setFormData] = useState({ ...user, id: user?.id });

  useEffect(() => {
    setFormData({ ...user, id: user?.id });
  }, [user]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Email"
            required
          />
          <button disabled={loading} className="w-full p-2 bg-blue-500 text-white rounded-lg">{loading ? "Loading..." : "Update"}</button>
        </form>
        <button onClick={onClose} className="mt-4 w-full p-2 bg-gray-300 rounded-lg hover:bg-gray-400">
          Cancel
        </button>
      </div>
    </div>
  );
}
