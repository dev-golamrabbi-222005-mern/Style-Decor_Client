import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const AssignedProject = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedProject, setSelectedProject] = useState(null);

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignedBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?decoratorEmail=${user.email}`
      );
      return res.data;
    },
  });

  const handleStatusUpdate = async (id, status) => {
    const statusInfo = { status: status };

    axiosSecure.patch(`/bookings/${id}/status`, statusInfo).then((res) => {
      if (res.data.modifiedCount) {
        if (status === "completed") {
          axiosSecure
            .patch(`/decorators/status/${user?.email}`, { status: "available" })
            .then(() => {
              console.log("Decorator is now available for new projects");
            });
        }

        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            status === "completed"
              ? "Project Finished.!!"
              : `Progress updated: ${status}`,
          showConfirmButton: false,
          timer: 2222,
        });
      }
    });
  };

  if (isLoading || loading)
    return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-4xl font-semibold mb-6">
        My Pending Projects: {bookings.length}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((project) => (
          <div
            key={project._id}
            className="card bg-amber-50 shadow-md border border-amber-200"
          >
            <div className="card-body">
              <div className="flex justify-between items-start">
                <h2 className="card-title text-primary">
                  {project.packageName}
                </h2>
                <div className="badge badge-outline text-xs capitalize">
                  {project.status.replace(/-/g, " ")}
                </div>
              </div>

              <div className="text-sm space-y-1 mt-2">
                <p>
                  <strong>Client:</strong> {project.userName}
                </p>
                <p className="truncate">
                  <strong>Location:</strong> {project.location}
                </p>
              </div>

              <div className="card-actions justify-end items-center gap-5 mt-4 pt-4 border-t border-amber-200">
                <label
                  htmlFor="details_modal"
                  className="btn btn-xs btn-outline"
                  onClick={() => setSelectedProject(project)}
                >
                  View Details
                </label>

                {project.status === "decorator-assigned" && (
                  <button
                    onClick={() =>
                      handleStatusUpdate(project._id, "planning-phase")
                    }
                    className="btn btn-success text-white"
                  >
                    {" "}
                    Start Planning{" "}
                  </button>
                )}

                {project.status === "planning-phase" && (
                  <button
                    onClick={() =>
                      handleStatusUpdate(project._id, "materials-prepared")
                    }
                    className="btn btn-success text-white"
                  >
                    {" "}
                    Materials Prepared{" "}
                  </button>
                )}
                {project.status === "materials-prepared" && (
                  <button
                    onClick={() =>
                      handleStatusUpdate(project._id, "on-the-way")
                    }
                    className="btn btn-success text-white"
                  >
                    {" "}
                    On the way to venue{" "}
                  </button>
                )}
                {project.status === "on-the-way" && (
                  <button
                    onClick={() =>
                      handleStatusUpdate(project._id, "setup-in-progress")
                    }
                    className="btn btn-success text-white"
                  >
                    {" "}
                    Setup in Progress{" "}
                  </button>
                )}
                {project.status === "setup-in-progress" && (
                  <button
                    onClick={() => handleStatusUpdate(project._id, "completed")}
                    className="btn btn-success text-white"
                  >
                    {" "}
                    Complete Project{" "}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DETAILS MODAL ================= */}
      <input type="checkbox" id="details_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-3xl bg-white">
          <h3 className="font-bold text-2xl border-b pb-2 text-primary">
            {selectedProject?.packageName}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Left Column: Info */}
            <div className="space-y-3">
              <p>
                <strong>Tracking ID:</strong>{" "}
                <span className="text-blue-600 font-mono">
                  {selectedProject?.trackingId}
                </span>
              </p>
              <p>
                <strong>Service:</strong> {selectedProject?.serviceName}
              </p>
              <p>
                <strong>Event Date:</strong> {selectedProject?.bookingDate}
              </p>
              <p>
                <strong>Location:</strong> {selectedProject?.location}
              </p>
              <p>
                <strong>Budget:</strong> ৳{selectedProject?.price}
              </p>
              <div className="p-3 bg-gray-100 rounded-lg">
                <p>
                  <strong>Current Status:</strong>
                  <span className="ml-2 badge badge-primary capitalize">
                    {selectedProject?.status.replace(/-/g, " ")}
                  </span>
                </p>
              </div>
            </div>

            {/* Right Column: Client & Assignment */}
            <div className="space-y-3">
              <div className="p-4 border rounded-lg bg-blue-50">
                <h4 className="font-bold mb-2">Client Details</h4>
                <p>
                  <strong>Name:</strong> {selectedProject?.userName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedProject?.userEmail}
                </p>
              </div>
              <p>
                <strong>Assigned On:</strong>{" "}
                {new Date(selectedProject?.assignedAt).toLocaleString()}
              </p>
              <p>
                <strong>Payment:</strong>{" "}
                <span className="badge badge-success text-white">
                  {selectedProject?.paymentStatus}
                </span>
              </p>
            </div>
          </div>

          <div className="modal-action">
            <label htmlFor="details_modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedProject;
