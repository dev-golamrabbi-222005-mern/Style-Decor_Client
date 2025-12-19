import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { BsPersonFillDash } from "react-icons/bs";
import { BsPersonFillSlash } from "react-icons/bs";
import { BsPersonFillUp } from "react-icons/bs";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: usersData = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Generic Function for PATCH updates
  const handleUpdateRole = (id, role, actionName) => {
    axiosSecure.patch(`/users/${actionName}/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success(`User is now an ${role}!`);
      }
    });
  };

  // Function for Deleting/Banning with confirmation
  const handleAction = (id, type) => {
    const isDelete = type === "delete";

    Swal.fire({
      title: "Are you sure?",
      text: isDelete
        ? "This user will be permanently removed!"
        : "This user will not be able to login!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        const request = isDelete
          ? axiosSecure.delete(`/users/${id}`)
          : axiosSecure.patch(`/users/ban/${id}`);

        request.then((res) => {
          if (res.data.deletedCount > 0 || res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Success!", `Action completed.`, "success");
          }
        });
      }
    });
  };

  const filteredUsers = usersData.filter(
    (user) =>
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto my-11">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-4xl font-semibold">
          All users List: {usersData.length}
        </h1>
        <label className="input bg-amber-100">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            required
            placeholder="Search user via Name or Email"
          />
        </label>
      </div>
      <div className="overflow-x-auto bg-primary p-5 rounded-2xl my-7">
        <table className="table bg-white text-center">
          {/* head */}
          <thead className="text-lg text-black bg-gray-200">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Take Action</th>
            </tr>
          </thead>
          {/* row 1 */}
          {filteredUsers.map((user, index) => {
            return (
              <tbody key={index} className="text-[16px]">
                <tr>
                  <td>
                    <div className="flex items-center gap-5">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.displayName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.createdAt.split("T")[0]}</td>
                  <td className="flex items-center justify-center gap-2">
                    {/* Make Admin */}
                    <button
                      onClick={() =>
                        handleUpdateRole(user._id, "admin", "admin")
                      }
                      disabled={user.role === "admin"}
                      className={`btn btn-square tooltip ${
                        user.role === "admin"
                          ? "btn-disabled"
                          : "btn-info text-white"
                      }`}
                      data-tip="Make Admin"
                    >
                      <FaUserShield size={18} />
                    </button>

                    {/* Ban User */}
                    <button
                      onClick={() => handleAction(user._id, "ban")}
                      disabled={user.status === "banned"}
                      className="btn btn-square tooltip btn-warning text-white"
                      data-tip={
                        user.status === "banned" ? "Already Banned" : "BAN"
                      }
                    >
                      <BsPersonFillSlash size={18} />
                    </button>

                    {/* Make Decorator */}
                    <button
                      onClick={() =>
                        handleUpdateRole(user._id, "decorator", "decorator")
                      }
                      disabled={user.role === "decorator"}
                      className="btn btn-square tooltip btn-success text-white"
                      data-tip="Make Decorator"
                    >
                      <BsPersonFillUp size={18} />
                    </button>

                    {/* Remove User */}
                    <button
                      onClick={() => handleAction(user._id, "delete")}
                      className="btn btn-square tooltip btn-error text-white"
                      data-tip="Remove User"
                    >
                      <BsPersonFillDash size={18} />
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
