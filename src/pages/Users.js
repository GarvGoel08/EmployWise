import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import User from "../components/User";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [opLoading, setOpLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (searchQuery) {
      const filteredUsers = users.filter((user) =>
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayedUsers(filteredUsers);
    } else {
      setDisplayedUsers(users);
    }
  }, [users, searchQuery]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    if (!token || Date.now() > Number(tokenExpiry)) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://reqres.in/api/users?page=${page}`);
        const data = await res.json();
        setUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (error) {
        toast.error("Failed to load users");
      }
      setLoading(false);
    };
    fetchUsers();
  }, [page]);

  const handleUpdateUser = async (updatedUser) => {
    try {
      setOpLoading(true);   
      const res = await fetch(`https://reqres.in/api/users/${updatedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (res.ok) {
        toast.success("User updated successfully!");
        setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
        setEditUser(null);
      } else {
        toast.error("Failed to update user");
      }
      setOpLoading(false);
    } catch {
      toast.error("Something went wrong");
      setOpLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      setOpLoading(true);
      const res = await fetch(`https://reqres.in/api/users/${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("User deleted!");
        setUsers(users.filter((u) => u.id !== userId));
        setDeleteUser(null);
      } else {
        toast.error("Failed to delete user");
      }
      setOpLoading(false);
    } catch {
      toast.error("Something went wrong");
      setOpLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-6">
      <div className="flex flex-row justify-between mb-8 mt-2">
      <h1 className="text-3xl font-bold text-blue-600">Users List</h1>
      <input type="text" placeholder="Search users..." className="p-2 border rounded-lg" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <div className="flex flex-col grow justify-between h-full">
        {!loading && displayedUsers.length === 0 && <p className="text-gray-500">No users found</p>}
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {displayedUsers.map((user) => (
              <User
                key={user.id}
                user={user}
                setEditUser={setEditUser}
                setDeleteUser={setDeleteUser}
              />
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="p-2 bg-gray-200 rounded-lg">{page}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
            className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <EditModal
        user={editUser}
        onClose={() => setEditUser(null)}
        onUpdate={handleUpdateUser}
        loading={opLoading}
      />
      <DeleteModal
        user={deleteUser}
        onClose={() => setDeleteUser(null)}
        onDelete={handleDeleteUser}
        loading={opLoading}
      />
    </div>
  );
}
