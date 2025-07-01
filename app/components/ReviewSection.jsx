import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { useGetReviewsByMenuIdQuery } from "../services/reviewApi";

const ReviewSection = ({ menuId, user }) => {
  const {
    data: reviews,
    isLoading,
    isError,
  } = useGetReviewsByMenuIdQuery(menuId);

  if (isLoading) return <p>Loading reviews...</p>;
  if (isError) return <p>Failed to load reviews.</p>;
  // show only approved reviews
  const approvedReviews = reviews.filter(
    (review) => review.status === "approved"
  );
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      {/* <ReviewList />  */}
      {isLoading ? (
        <p>Loading reviews...</p>
      ) : isError ? (
        <p>Failed to load reviews.</p>
      ) : (
        <ReviewList reviews={approvedReviews} />
      )}
      {/* Review form */}
      {user ? (
        <ReviewForm menuId={menuId} />
      ) : (
        <p className="text-gray-600 mt-6">Login to write a review.</p>
      )}
    </div>
  );
};

export default ReviewSection;
