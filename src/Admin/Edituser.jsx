import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("active");
  const [role, setRole] = useState("user");

  // Fetch user details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((res) => {
        setUser(res.data);
        setStatus(res.data.status || "active");
        setRole(res.data.role || "user");
      })
      .catch((err) => console.error("Failed to fetch user:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        status,
        role,
      });
      alert("✅ User updated successfully!");
      navigate("/admin/users");
    } catch (err) {
      console.error("Failed to update user:", err);
      alert("❌ Failed to save changes.");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading user...</div>;
  if (!user) return <div className="p-6 text-center text-gray-500">User not found.</div>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Name</label>
        <p className="border rounded-md p-2 bg-gray-50">{user.name}</p>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Email</label>
        <p className="border rounded-md p-2 bg-gray-50">{user.email}</p>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border rounded-md p-2 w-full"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`border rounded-md p-2 w-full ${
            status === "blocked" ? "bg-red-50" : "bg-green-50"
          }`}
        >
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => navigate("/admin/users")}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
