function LoadingSpinner() {
    return(
        <div className="flex min-h-[500px] items-center justify-center dark:bg-slate-900">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-600"></div>
        </div>
    );
}

export default LoadingSpinner;
