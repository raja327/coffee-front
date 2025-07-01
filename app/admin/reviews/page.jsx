"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import {
  useGetAllReviewsQuery,
  useUpdateReviewStatusMutation,
  useDeleteReviewMutation,
} from "../../services/reviewApi";
import { toast } from "react-hot-toast";

const AdminReviewPanel = () => {
  const [filterStatus, setFilterStatus] = useState("all");

  const { data: reviews = [], isLoading, isError } = useGetAllReviewsQuery();
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateReviewStatusMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateStatus({ reviewId: id, status }).unwrap();
      toast.success(`Review ${status}`);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update review");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteReview(id).unwrap();
      toast.success("Review deleted");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete review");
    }
  };

  const filteredReviews =
    filterStatus === "all"
      ? reviews
      : reviews.filter((review) => review.status === filterStatus);

  return (
    <div className="p-8 bg-[#FAF6F0] rounded-2xl shadow-md max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-[#5A3D2E]">
        ☕ Review Management
      </h1>

      <div className="flex flex-wrap items-center gap-4">
        <label
          className="text-sm font-medium text-[#5A3D2E]"
          htmlFor="filterStatus"
        >
          Filter by Status:
        </label>
        <select
          id="filterStatus"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-lg border border-[#D6BAA6] bg-white focus:outline-none focus:ring-2 focus:ring-[#A47551]"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {isLoading ? (
        <p className="text-center text-[#5A3D2E]">Loading reviews...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load reviews</p>
      ) : filteredReviews.length === 0 ? (
        <p className="text-center text-[#5A3D2E]">No reviews found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#E0D3C2] bg-white">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#F4EDE4] text-[#5A3D2E] text-left">
                <th className="p-3">Reviewer</th>
                <th className="p-3">Menu</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Comment</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((review) => (
                <tr
                  key={review._id}
                  className="border-t border-[#F0E5DA] hover:bg-[#FFFBF7]"
                >
                  <td className="p-3">{review.user?.name || "Anonymous"}</td>
                  <td className="p-3">{review.menu?.name || "-"}</td>
                  <td className="p-3 text-yellow-500">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill="#facc15"
                        stroke="#facc15"
                        className="inline"
                      />
                    ))}
                  </td>
                  <td className="p-3 max-w-xs truncate" title={review.comment}>
                    {review.comment}
                  </td>
                  <td className="p-3">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 capitalize">{review.status}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleStatusUpdate(review._id, "approved")}
                      disabled={isUpdating}
                      aria-label={`Approve review by ${
                        review.user?.name || "Anonymous"
                      }`}
                      className="text-green-600 hover:underline text-sm disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(review._id, "rejected")}
                      disabled={isUpdating}
                      aria-label={`Reject review by ${
                        review.user?.name || "Anonymous"
                      }`}
                      className="text-red-600 hover:underline text-sm disabled:opacity-50"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      disabled={isDeleting}
                      aria-label={`Delete review by ${
                        review.user?.name || "Anonymous"
                      }`}
                      className="text-blue-600 hover:underline text-sm disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminReviewPanel;
