import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { 
  Search, 
  ArrowUpDown, 
  Calendar, 
  User, 
  Briefcase, 
  CheckCircle, 
  XCircle, 
  Eye,
  Clock,
  MapPin,
} from "lucide-react";

const AssignedProject = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("pending-approval");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: bookings = [], isLoading, refetch } = useQuery({
    queryKey: ["assignedBookings", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?decoratorEmail=${user.email}`);
      return res.data;
    },
  });

  // --- Logic for Accepting & Rejecting (Unchanged) ---
  const handleAccept = async (id) => {
    const result = await Swal.fire({
      title: "Accept Project?",
      text: "Your details will be linked to this booking.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Accept & Start",
      confirmButtonColor: "#22c55e",
    });

    if (result.isConfirmed) {
      const decoratorData = {
        decoratorEmail: user.email,
        decoratorName: user.displayName,
        decoratorPhoto: user.photoURL,
        status: "decorator-assigned",
        acceptedAt: new Date(),
      };

      try {
        const res = await axiosSecure.patch(`/bookings/${id}/accept`, decoratorData);
        if (res.data.modifiedCount > 0) {
          await axiosSecure.patch(`/decorators/status-update-by-email/${user.email}`, { status: "assigned" });
          Swal.fire("Success", "Project accepted successfully!", "success");
          refetch();
        }
      } catch (err) {
        Swal.fire("Error", "Could not process acceptance.", "error");
      }
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Reject Project?",
      text: "This will release the project back to pool.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
      confirmButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/bookings/${id}/reject`);
        if (res.data.modifiedCount > 0) {
          await axiosSecure.patch(`/decorators/status-update-by-email/${user.email}`, { status: "available" });
          Swal.fire("Rejected", "Project returned to pool.", "info");
          refetch();
        }
      } catch (err) {
        Swal.fire("Error", "Failed to reject project", "error");
      }
    }
  };

  // --- Filtering & Pagination Logic ---
  const filteredProjects = useMemo(() => {
    return bookings
      .filter(p => p.status === activeTab)
      .filter(p => 
        p.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.trackingId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [bookings, activeTab, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  if (isLoading || loading) return (
    <div className="flex justify-center my-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>
  );

  return (
    <div className="pb-10">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center text-center md:text-left justify-between mb-8 gap-4">
        <div className="">
          <h1 className="text-2xl md:text-3xl font-serif font-black text-slate-800">
            All Projects
          </h1>
          <p className="text-slate-500 text-sm">
            Manage your proposals and completed works
          </p>
        </div>
        <div className="flex gap-3 justify-center md:justify-items-start">
          <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
            <p className="text-[10px] font-bold text-blue-600 uppercase">
              New Proposals
            </p>
            <p className="text-xl font-black text-blue-700">
              {bookings.filter((p) => p.status === "pending-approval").length}
            </p>
          </div>
          <div className="bg-green-50 px-4 py-2 rounded-xl border border-green-100">
            <p className="text-[10px] font-bold text-green-600 uppercase">
              Completed
            </p>
            <p className="text-xl font-black text-green-700">
              {bookings.filter((p) => p.status === "completed").length}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <div className="tabs tabs-boxed bg-slate-100 p-1 rounded-2xl w-full md:w-auto">
          <button
            onClick={() => {
              setActiveTab("pending-approval");
              setCurrentPage(1);
            }}
            className={`tab tab-md font-bold px-6 ${activeTab === "pending-approval" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:outline-1"}`}
          >
            New Proposals
          </button>
          <button
            onClick={() => {
              setActiveTab("completed");
              setCurrentPage(1);
            }}
            className={`tab tab-md font-bold px-6 ${activeTab === "completed" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:outline-1"}`}
          >
            Completed History
          </button>
        </div>

        <div className="relative flex-1 w-full">
          <Search className="absolute z-10 left-2.5 top-2.5" size={18} />
          <input
            type="text"
            placeholder="Search by Package, Client, or Tracking ID..."
            className="input input-bordered pl-12 w-full bg-white rounded-2xl border-slate-200 focus:ring-2 focus:ring-primary/10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-slate-50/50 text-slate-500 uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="py-5 pl-8 text-center w-16">ID</th>
                <th>Project / Package</th>
                <th>Client Info</th>
                <th className="text-center">Event Date</th>
                <th className="text-center">Budget</th>
                <th className="pr-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              {currentItems.map((project, idx) => (
                <tr
                  key={project._id}
                  className="hover:bg-slate-50/80 transition-colors border-b border-slate-50"
                >
                  <td className="text-center pl-8">
                    <span className="text-xs font-mono text-slate-400">
                      #{indexOfFirstItem + idx + 1}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <p className="font-bold text-slate-900 leading-tight">
                        {project.packageName}
                      </p>
                      <p className="text-[10px] text-primary font-bold flex items-center gap-1 mt-1 uppercase">
                        <Briefcase size={10} /> {project.serviceName}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        <User size={14} />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-slate-800">
                          {project.userName}
                        </p>
                        <p className="text-slate-400">{project.userEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg text-xs font-medium">
                      <Calendar size={12} className="text-slate-400" />{" "}
                      {project.bookingDate}
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="text-sm font-black text-slate-800">
                      ৳{project.price}
                    </span>
                  </td>
                  <td className="pr-8 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="btn btn-ghost btn-sm text-slate-400 hover:text-primary tooltip"
                        data-tip="View Details"
                      >
                        <label
                          htmlFor="details_modal"
                          className="cursor-pointer"
                        >
                          <Eye size={18} />
                        </label>
                      </button>

                      {project.status === "pending-approval" && (
                        <>
                          <button
                            onClick={() => handleReject(project._id)}
                            className="btn btn-ghost btn-sm text-red-400 hover:bg-red-50 tooltip"
                            data-tip="Reject Project"
                          >
                            <XCircle size={18} />
                          </button>
                          <button
                            onClick={() => handleAccept(project._id)}
                            className="btn btn-ghost btn-sm text-green-500 hover:bg-green-50 tooltip"
                            data-tip="Accept & Start"
                          >
                            <CheckCircle size={18} />
                          </button>
                        </>
                      )}

                      {project.status === "completed" && (
                        <span className="badge badge-success text-white badge-sm font-bold">
                          Done
                        </span>
                      )}
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
              <Briefcase size={40} />
            </div>
            <p className="text-slate-400 italic">
              No projects found in this section.
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredProjects.length > 0 && (
          <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50/30">
            <p className="text-sm text-slate-500 font-medium">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredProjects.length)} of{" "}
              {filteredProjects.length} projects
            </p>
            <div className="join">
              <button
                className="join-item btn btn-sm bg-gray-300 text-black text-lg"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                {" "}
                «{" "}
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`join-item btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "bg-white"}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="join-item btn btn-sm bg-gray-300 text-black text-lg"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                {" "}
                »{" "}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal (Fixed UI) */}
      <input type="checkbox" id="details_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-2xl rounded-[2.5rem] p-8 bg-white">
          <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-6">
            <div>
              <h3 className="font-black text-2xl text-slate-800">
                {selectedProject?.packageName}
              </h3>
              <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1">
                ID: {selectedProject?.trackingId}
              </p>
            </div>
            <label
              htmlFor="details_modal"
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-600">
                <MapPin size={18} className="text-slate-400" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">
                    Location
                  </p>
                  <p className="text-sm font-semibold">
                    {selectedProject?.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Clock size={18} className="text-slate-400" />
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">
                    Booking Date
                  </p>
                  <p className="text-sm font-semibold">
                    {selectedProject?.bookingDate}
                  </p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">
                  Current Status
                </p>
                <span className="badge badge-primary badge-md font-bold capitalize p-3">
                  {selectedProject?.status.replace(/-/g, " ")}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 border border-blue-50 bg-blue-50/30 rounded-[2rem]">
                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <User size={16} /> Client Details
                </h4>
                <p className="text-sm font-bold text-slate-700">
                  {selectedProject?.userName}
                </p>
                <p className="text-xs text-slate-500">
                  {selectedProject?.userEmail}
                </p>
              </div>
              <div className="flex justify-between items-end p-2">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">
                    Total Budget
                  </p>
                  <p className="text-2xl font-black text-slate-800">
                    ৳{selectedProject?.price}
                  </p>
                </div>
                <div className="text-right font-bold text-xs">
                  <p
                    className={
                      selectedProject?.paymentStatus === "paid"
                        ? "text-green-500"
                        : "text-orange-500 uppercase"
                    }
                  >
                    {selectedProject?.paymentStatus}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-action mt-8">
            <label
              htmlFor="details_modal"
              className="btn btn-primary rounded-xl px-10"
            >
              Got it
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedProject;