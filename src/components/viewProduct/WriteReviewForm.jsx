import { useState } from "react";

function WriteReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      setError("Please select a star rating.");
      return;
    }
    if (!comment.trim()) {
      setError("Please write a comment.");
      return;
    }

    setError("");
    setSubmitted(false);
    setSubmitting(true);

    try {
      await onSubmit({ rating, comment: comment.trim() });
      setRating(0);
      setComment("");
      setSubmitted(true);
    } catch (err) {
      setError(err?.message || "Couldn't submit your review. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-5 mb-6 border border-gray-100 dark:border-gray-700 w-full md:w-[70%]"
    >
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Write a review
        </h3>

        <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => {
                        setRating(star);
                        setError("");
                        setSubmitted(false);
                    }}
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    className="p-0.5"
                >
                    <i
                        className={`fa-solid fa-star text-lg ${
                        star <= rating
                            ? "text-yellow-400"
                            : "text-gray-200 dark:text-slate-700"
                        }`}
                    />
                </button>
            ))}
        </div>
        
        <textarea
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setSubmitted(false);
          }}
          rows={3}
          placeholder="Share your thoughts..."
          className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />

        {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
        {submitted && !error && (
            <p className="text-xs text-green-600 mb-3">Review submitted!</p>
        )}

        <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg mt-2"
        >
            {submitting ? "Submitting..." : "Submit review"}
        </button>
    </form>
  );
}

export default WriteReviewForm;
