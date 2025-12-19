import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { BsPersonFillDash } from "react-icons/bs";
import { BsPersonFillX } from "react-icons/bs";
import { BsPersonFillSlash } from "react-icons/bs";
import { BsPersonFillCheck } from "react-icons/bs";

const DecoratorManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: decoratorsData = [], refetch } = useQuery({
    queryKey: ["decorator"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators");      
      return res.data;
    },
  });

  const filteredDecorators = decoratorsData.filter(
    (decorator) =>
      decorator.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      decorator.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto my-11">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-4xl font-semibold">
          All Decorators List: {decoratorsData.length}
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
              <th>Apply Date</th>
              <th>Experience (yr)</th>
              <th>Take Action</th>
            </tr>
          </thead>
          {/* row 1 */}
          {filteredDecorators.map((decorator, index) => {
            return (
              <tbody key={index} className="text-[16px]">
                <tr>
                  <td>
                    <div className="flex items-center gap-5">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={decorator.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{decorator.displayName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{decorator.email}</td>
                  <td>{decorator.appliedAt.split("T")[0]}</td>
                  <td className="font-semibold">{decorator.experience}</td>
                  <td className="">
                    <button
                      className="btn btn-square tooltip"
                      data-tip="Make Admin"
                    >
                      <FaUserShield />
                    </button>
                    <button
                      className="btn btn-square mx-5 tooltip"
                      data-tip="BAN"
                    >
                      <BsPersonFillSlash />
                    </button>
                    <button
                      className="btn btn-square tooltip text-xl mr-5"
                      data-tip="Approve Decorator"
                    >
                      <BsPersonFillCheck />
                    </button>
                    <button
                      className="btn btn-square tooltip text-xl mr-5"
                      data-tip="Reject Decorator"
                    >
                      <BsPersonFillX />
                    </button>
                    <button
                      className="btn btn-square tooltip text-xl"
                      data-tip="Remove Decorator"
                    >
                      <BsPersonFillDash />
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

export default DecoratorManagement;
