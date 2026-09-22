import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

function Pagination ({
    page, 
    totalPages, 
    onPageChange, 
    paginationLoading = false,
}) {
    if (totalPages <= 1) return null;

    return(
        <div className="mt-8 flex items-center justify-center gap-5">
            <button
                onClick={() => onPageChange(prev => prev - 1)}
                disabled={page === 1 || paginationLoading}
                className="cursor-pointer disabled:cursor-default disabled:opacity-50 text-slate-600 enabled:hover:text-slate-900 dark:text-slate-200 dark:enabled:hover:text-blue-300 p-2"
            >
                <IoMdArrowDropleft size={20} />
            </button>
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{page} of {totalPages}</span>
                {paginationLoading && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700"/>
                )}
            </div>
            <button
                onClick={() => onPageChange(prev => prev + 1)}
                disabled={page === totalPages || paginationLoading}
                className="cursor-pointer disabled:cursor-default disabled:opacity-50 text-slate-600 enabled:hover:text-slate-900 dark:text-slate-200 dark:enabled:hover:text-blue-300 p-2"
            >
                <IoMdArrowDropright size={20} />
            </button>
        </div>
    )
}

export default Pagination;
