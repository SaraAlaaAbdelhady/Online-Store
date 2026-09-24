function ErrorMsg() {
    return (
        <div className="flex min-h-[400px] items-center justify-center bg-red-50 dark:bg-slate-900">
            <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-100 dark:bg-red-950 px-8 py-6 text-center shadow-sm">
                <p className="text-lg font-semibold text-red-600 dark:text-red-400">Something went wrong</p>
                <p className="mt-2 text-sm text-red-500 dark:text-red-300">Please try again later.</p>
            </div>
        </div>
    );
}

export default ErrorMsg;
