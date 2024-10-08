import React, { useState } from "react";
import { useUpdateUserRoleMutation } from "../../../../redux/features/auth/authApi";

const UpdateUserRoleModal = ({ user, onClose, onRoleUpdate }) => {
  const [role, setRole] = useState(user?.role);
  const [updateUerRole, { isLoading, error }] = useUpdateUserRoleMutation();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await updateUerRole({
        id: user?._id,
        role,
      }).unwrap();
      onRoleUpdate();
      onClose();
      alert("User updated!");
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">
          Update Role for{" "}
          <span className="italic text-red-500">{user?.email}</span>
        </h2>
        <select
          className="block w-full p-2 border border-gary-300 rounded-md mb-4"
          value={role}
          onChange={handleRoleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Updating" : "Update Role"}
          </button>
          <button
            className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserRoleModal;
