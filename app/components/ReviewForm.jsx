import { useState } from "react";
import { useCreateReviewMutation } from "../services/reviewApi";
import { Star } from "lucide-react";

const RatingStars = ({ rating, setRating }) => {
  return (
    <div className="flex items-center gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => setRating(star)}
          className="text-yellow-400 hover:scale-110 transition-transform"
        >
          <Star
            size={28}
            fill={star <= rating ? "#facc15" : "none"}
            stroke="#facc15"
          />
        </button>
      ))}
    </div>
  );
};

const ReviewForm = ({ menuId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createReview({ menuId, rating, comment });
      console.log(res);
      setRating(5);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 p-6 bg-white shadow-md rounded-xl space-y-4"
    >
      <h3 className="text-xl font-bold">Write a Review</h3>

      <div>
        <label className="block font-medium mb-1">Your Rating</label>
        <RatingStars rating={rating} setRating={setRating} />
      </div>

      <div>
        <label className="block font-medium mb-1">Comment</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-black"
          rows={4}
          placeholder="Write your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-all"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
