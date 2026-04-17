import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import {
  Search,
  Calendar,
  User,
  Briefcase,
  Eye,
  MapPin,
  Clock,
  ChevronRight,
  ClipboardList,
} from "lucide-react";

const AssignedProject = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignedBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?decoratorEmail=${user.email}`,
      );
      return res.data;
    },
  });

  const handleStatusUpdate = async (id, status) => {
    const statusInfo = {
      status: status,
      completedAt: new Date(),
    };

    try {
      const res = await axiosSecure.patch(`/bookings/${id}/status`, statusInfo);
      if (res.data.modifiedCount) {
        if (status === "completed") {
          await axiosSecure.patch(
            `/decorators/status-update-by-email/${user?.email}`,
            { status: "available" },
          );
        }
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            status === "completed"
              ? "Project Finished!"
              : `Progress: ${status.replace(/-/g, " ")}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  // Filtering & Pagination
  const filteredProjects = useMemo(() => {
    return bookings
      .filter((p) => p.status !== "completed")
      .filter(
        (p) =>
          p.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.userName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
  }, [bookings, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProjects.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  // Helper to get Next Status Button
  const getStatusButton = (project) => {
    const config = {
      "decorator-assigned": {
        text: "Start Planning",
        next: "planning-phase",
        color: "btn-info",
      },
      "planning-phase": {
        text: "Materials Ready",
        next: "materials-prepared",
        color: "btn-warning",
      },
      "materials-prepared": {
        text: "On the Way",
        next: "on-the-way",
        color: "btn-accent",
      },
      "on-the-way": {
        text: "Start Setup",
        next: "setup-in-progress",
        color: "btn-secondary",
      },
      "setup-in-progress": {
        text: "Finish Project",
        next: "completed",
        color: "btn-success",
      },
    };

    const current = config[project.status];
    if (!current) return null;

    return (
      <button
        onClick={() => handleStatusUpdate(project._id, current.next)}
        className={`btn btn-xs ${current.color} text-white font-bold rounded-lg px-3`}
      >
        {current.text} <ChevronRight size={12} />
      </button>
    );
  };

  if (isLoading || loading)
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-serif font-black text-slate-800">
            My Active Projects
          </h1>
          <p className="text-slate-500 text-sm italic mt-2">
            You have {filteredProjects.length} projects in progress
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search
            className="absolute top-2.5 left-2.5 z-10"
            size={18}
          />
          <input
            type="text"
            placeholder="Search active projects..."
            className="input input-bordered pl-12 w-full bg-white rounded-2xl border-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-slate-50/50 text-slate-500 uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="py-5 pl-8">Project Details</th>
                <th>Client</th>
                <th className="text-center">Current Phase</th>
                <th className="pr-8 text-right">Update Progress</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              {currentItems.map((project) => (
                <tr
                  key={project._id}
                  className="hover:bg-slate-50/80 transition-colors border-b border-slate-50"
                >
                  <td className="py-4 pl-8">
                    <div className="flex flex-col">
                      <p className="font-bold text-slate-900 leading-tight">
                        {project.packageName}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                          {project.serviceName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ID: {project.trackingId}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User size={14} />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-slate-800">
                          {project.userName}
                        </p>
                        <p className="text-slate-400 flex items-center gap-1">
                          <MapPin size={10} /> {project.location}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="badge badge-ghost text-[10px] font-black uppercase tracking-widest py-3 px-4 border-slate-200">
                      {project.status.replace(/-/g, " ")}
                    </div>
                  </td>
                  <td className="pr-8 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="p-2 text-slate-400 hover:text-primary transition-colors tooltip"
                        data-tip="View Full Details"
                      >
                        <label
                          htmlFor="details_modal"
                          className="cursor-pointer"
                        >
                          <Eye size={20} />
                        </label>
                      </button>
                      {getStatusButton(project)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="p-20 text-center flex flex-col items-center">
            <div className="p-4 bg-slate-50 rounded-full mb-4 text-slate-300">
              <ClipboardList size={40} />
            </div>
            <p className="text-slate-500 font-medium">
              No active projects to show.
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredProjects.length > itemsPerPage && (
          <div className="p-6 flex items-center justify-between bg-slate-50/30">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Page {currentPage} of {totalPages}
            </span>
            <div className="join">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="join-item btn btn-xs px-4"
              >
                Prev
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="join-item btn btn-xs px-4"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      <input type="checkbox" id="details_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-2xl rounded-[2.5rem] p-8 bg-white border-4 border-slate-50">
          <div className="flex justify-between items-start mb-6 border-b border-slate-50 pb-4">
            <div>
              <h3 className="font-black text-2xl text-slate-800">
                {selectedProject?.packageName}
              </h3>
              <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1">
                Status: {selectedProject?.status.replace(/-/g, " ")}
              </p>
            </div>
            <label
              htmlFor="details_modal"
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-5 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-400">
                    Event Date
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    {selectedProject?.bookingDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-400">
                    Venue
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    {selectedProject?.location}
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <p className="text-[10px] uppercase font-black text-slate-400 mb-1">
                  Price Package
                </p>
                <p className="text-xl font-black text-slate-800">
                  ৳{selectedProject?.price}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 border border-blue-50 bg-blue-50/30 rounded-3xl">
                <h4 className="font-black text-slate-800 text-xs uppercase mb-3 flex items-center gap-2 tracking-widest">
                  <User size={14} /> Client Details
                </h4>
                <p className="text-sm font-bold text-slate-700">
                  {selectedProject?.userName}
                </p>
                <p className="text-xs text-slate-500">
                  {selectedProject?.userEmail}
                </p>
              </div>
              <div className="p-5 border border-slate-100 rounded-3xl">
                <h4 className="font-black text-slate-800 text-xs uppercase mb-3 flex items-center gap-2 tracking-widest">
                  <Clock size={14} /> Timeline
                </h4>
                <p className="text-[10px] text-slate-400">
                  Assigned:{" "}
                  {new Date(selectedProject?.assignedAt).toLocaleString()}
                </p>
                <div className="badge badge-success badge-xs mt-2 text-white font-bold">
                  {selectedProject?.paymentStatus}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-action mt-8">
            <label
              htmlFor="details_modal"
              className="btn btn-primary rounded-2xl px-12 text-white font-black"
            >
              Close Details
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedProject;
