// style logic for status
const statusStyles = {
    pending: {
        label: "Pending",
        bg: "bg-amber-100 dark:bg-amber-900/30",
        text: "text-amber-700 dark:text-amber-400",
    },
    confirmed: {
        label: "Confirmed",
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-700 dark:text-blue-400",
    },
    processing: {
        label: "Processing",
        bg: "bg-purple-100 dark:bg-purple-900/30",
        text: "text-purple-700 dark:text-purple-400",
    },
    shipped: {
        label: "Shipped",
        bg: "bg-cyan-100 dark:bg-cyan-900/30",
        text: "text-cyan-700 dark:text-cyan-400",
    },
    delivered: {
        label: "Delivered",
        bg: "bg-green-100 dark:bg-green-400",
        text: "text-green-700 dark:text-green-400",
    },
    cancelled: {
        label: "Cancelled",
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-700 dark:text-red-400",
    },
    returned: {
        label: "Returned",
        bg: "bg-gray-100 dark:bg-gray-900/30",
        text: "text-gray-700 dark:text-gray-400",
    },
};

function StatusBadge({status}) {
    return (
        <span className={`${statusStyles[status].bg} ${statusStyles[status].text} text-xs font-medium py-0.5 px-2.5 rounded-full text-center inline-flex items-center`}>{statusStyles[status].label}</span>
    )
}

export default StatusBadge;
