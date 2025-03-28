import React from "react";

export default function User({ user, setEditUser, setDeleteUser }) {
  return (
    <div
      key={user.id}
      className="bg-white p-4 rounded-lg shadow-md flex min-[450px]:items-center justify-between min-[450px]:flex-row flex-col gap-4 space-x-4"
    >
      <div
      className="flex items-center space-x-4 flex-row">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-12 h-12 rounded-full"
          loading="lazy"
        />
        <div>
          <h2 className="text-lg font-semibold">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <div className="ml-auto">
        <button
          onClick={() => setEditUser(user)}
          className="text-blue-500 hover:underline mr-3"
        >
          Edit
        </button>
        <button
          onClick={() => setDeleteUser(user)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
