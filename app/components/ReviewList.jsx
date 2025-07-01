import React, { useState } from "react";

const getInitials = (name = "") => {
  const names = name.split(" ");
  return names.length >= 2
    ? names[0][0].toUpperCase() + names[1][0].toUpperCase()
    : names[0]?.[0]?.toUpperCase() || "?";
};

const MAX_CHAR = 150;
const REVIEWS_PER_PAGE = 5;

const ReviewList = ({ reviews }) => {
  const [sortBy, setSortBy] = useState("date-desc");
  const [expandedComments, setExpandedComments] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const toggleExpand = (id) => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!reviews || reviews.length === 0)
    return <p className="text-center text-gray-600">No reviews yet.</p>;

  // Sort reviews
  let sortedReviews = [...reviews];
  switch (sortBy) {
    case "date-asc":
      sortedReviews.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      break;
    case "date-desc":
      sortedReviews.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
    case "rating-asc":
      sortedReviews.sort((a, b) => a.rating - b.rating);
      break;
    case "rating-desc":
      sortedReviews.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  // Pagination logic
  const totalPages = Math.ceil(sortedReviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = sortedReviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      {/* Sorting controls */}
      <div className="flex justify-between items-center mb-4">
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1); // reset to page 1 on sort
          }}
          className="border rounded px-3 py-1 text-sm"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="rating-desc">Highest Rating</option>
          <option value="rating-asc">Lowest Rating</option>
        </select>

        {/* Pagination controls */}
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 text-sm border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-sm border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Review cards */}
      {paginatedReviews.map((review) => {
        const isExpanded = expandedComments[review._id];
        const comment = review.comment || "";
        const shouldTruncate = comment.length > MAX_CHAR;

        return (
          <div
            key={review._id}
            className="flex gap-4 items-start p-4 border rounded-lg shadow-sm"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-sm font-bold text-gray-700 shrink-0">
              {getInitials(review.user?.name)}
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold text-sm">
                  {review.user?.name || "Anonymous"}
                </p>
                <p className="text-yellow-500 text-sm font-medium">
                  ⭐ {review.rating}
                </p>
              </div>

              <p className="text-gray-700 text-sm mb-1">
                {shouldTruncate && !isExpanded
                  ? comment.slice(0, MAX_CHAR) + "..."
                  : comment}
              </p>

              {shouldTruncate && (
                <button
                  onClick={() => toggleExpand(review._id)}
                  className="text-blue-600 text-xs underline"
                >
                  {isExpanded ? "Show less" : "Show more"}
                </button>
              )}

              <p className="text-gray-400 text-xs mt-1">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewList;
