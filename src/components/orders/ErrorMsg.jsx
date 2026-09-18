function ErrorMsg({ message }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-red-50">
            <div className="rounded-xl border border-red-200 bg-red-100 px-8 py-6 text-center shadow-sm">
                <p className="text-lg font-semibold text-red-600">{message}</p>
                <p className="mt-2 text-sm text-red-500">Please try again later.</p>
            </div>
        </div>
    );
}

export default ErrorMsg;
