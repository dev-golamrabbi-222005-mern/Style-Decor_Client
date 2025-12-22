import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const AssignedProject = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedProject, setSelectedProject] = useState(null);
  
const { data: bookings = [], isLoading } = useQuery({
  queryKey: ["assignedBookings", user?.email],
  enabled: !loading && !!user?.email, 
  queryFn: async () => {
    const res = await axiosSecure.get(`/bookings?decoratorEmail=${user.email}`);
    return res.data;
  },
});

  const handleAccept = async (id) => {
    const result = await Swal.fire({
      title: "Accept Project?",
      text: "Your details will be linked to this booking.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Accept & Start",
    });

    if (result.isConfirmed) {
      // Collect the decorator's data to be "stamped" into the booking
      const decoratorData = {
        decoratorEmail: user.email,
        decoratorName: user.displayName,
        decoratorPhoto: user.photoURL,
        status: "decorator-assigned",
        acceptedAt: new Date(),
      };

      try {
        const res = await axiosSecure.patch(
          `/bookings/${id}/accept`,
          decoratorData
        );
        if (res.data.modifiedCount > 0) {
          // Also update decorator's own status to 'assigned'
          await axiosSecure.patch(`/decorators/status-update-by-email/${user.email}`, {
            status: "assigned",
          });
          Swal.fire(
            "Success",
            "You are now the lead decorator for this project!",
            "success"
          );
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
    text: "This will release the project back to Admin.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Reject",
    confirmButtonColor: "#ef4444",
  });

  if (result.isConfirmed) {
    try {
      // 1. Reset booking status and REMOVE decorator email
      const res = await axiosSecure.patch(`/bookings/${id}/reject`);

      if (res.data.modifiedCount > 0) {
        // 2. Make the decorator 'available' again
        await axiosSecure.patch(`/decorators/status-update-by-email/${user.email}`, {
          status: "available",
        });

        Swal.fire("Rejected", "Project returned to pool.", "info");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to reject project", "error");
    }
  }
};

  if (isLoading || loading)
    return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-4xl font-semibold mb-6">
        New Project Proposals:{bookings
          .filter((project) => project.status === "pending-approval").length}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings
          .filter((project) => project.status === "pending-approval" && project.status === "completed")
          .map((project) => (
            <div
              key={project._id}
              className={`card shadow-md border ${
                project.status === "pending-approval"
                  ? "bg-blue-50 border-blue-200"
                  : "bg-white"
              }`}
            >
              <div className="card-body">
                <h2 className="card-title">{project.packageName}</h2>
                <p className="text-sm">Client: {project.userName}</p>
                <p className="text-sm">Date: {project.bookingDate}</p>

                <div className="card-actions justify-end items-center mt-4">
                  <label
                    htmlFor="details_modal"
                    className="btn btn-xs btn-outline"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Details
                  </label>
                  {project.status === "pending-approval" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReject(project._id)}
                        className="btn btn-sm btn-error text-white"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleAccept(project._id)}
                        className="btn btn-sm btn-success text-white"
                      >
                        Accept
                      </button>
                    </div>
                  ) : (
                    <div className="badge badge-success text-white uppercase p-3">
                      Active Workflow
                    </div>
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
