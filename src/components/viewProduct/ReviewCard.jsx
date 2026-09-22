import { useState } from "react";
import formatDate from "../../utils/formatDate";
import { FaRegTrashCan } from "react-icons/fa6";
 
function ReviewCard({ review, canDelete = false, onDelete }) {
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const displayName = review.username || "Anonymous";

    const handleDelete = async () => {
        if (!onDelete || deleting) return;

        setDeleteError("");
        setDeleting(true);
        try {
            await onDelete(review._id);
        } catch (err) {
            setDeleteError(err?.message || "Couldn't delete this review.");
            setDeleting(false);
        }
    };

    return (
        <div className="border-b border-gray-100 dark:border-gray-700 py-5 last:border-b-0 w-full md:w-[70%]">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm font-semibold shrink-0">
                        {displayName[0]?.toUpperCase()}
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                            {displayName}
                        </p>
                        {review.createdAt && (
                            <p className="text-xs text-gray-400">
                                {formatDate(review.createdAt)}
                            </p>
                        )}
                    </div>
                </div>

                {canDelete && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleting}
                        aria-label="Delete review"
                        className="text-gray-400 hover:text-red-500 disabled:opacity-50 shrink-0 p-1"
                    >
                        <FaRegTrashCan />
                    </button>
                )}
            </div>

            <div className="ml-12 flex flex-col gap-1">
                <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <i
                            key={star}
                            className={`fa-solid fa-star text-sm ${
                                star <= Math.round(review.rating)
                                    ? "text-yellow-400"
                                    : "text-gray-200 dark:text-slate-700"
                            }`}
                        ></i>
                    ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-6">
                    {review.comment}
                </p>
            </div>

            {deleteError && (
                <p className="text-xs text-red-500 mt-2">{deleteError}</p>
            )}
        </div>
    );
}

export default ReviewCard;
