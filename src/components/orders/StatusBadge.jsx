// style logic for status
const statusStyles = {
    pending: {
        label: "Pending",
        bg: "bg-amber-100",
        text: "text-amber-700",
    },
    confirmed: {
        label: "Confirmed",
        bg: "bg-blue-100",
        text: "text-blue-700",
    },
    processing: {
        label: "Processing",
        bg: "bg-purple-100",
        text: "text-purple-700",
    },
    shipped: {
        label: "Shipped",
        bg: "bg-cyan-100",
        text: "text-cyan-700",
    },
    delivered: {
        label: "Delivered",
        bg: "bg-green-100",
        text: "text-green-700",
    },
    cancelled: {
        label: "Cancelled",
        bg: "bg-red-100",
        text: "text-red-700",
    },
    returned: {
        label: "Returned",
        bg: "bg-gray-100",
        text: "text-gray-700",
    },
};

function StatusBadge({status}) {
    return (
        <span className={`${statusStyles[status].bg} ${statusStyles[status].text} text-xs font-medium py-0.5 px-2.5 rounded-full text-center inline-flex items-center`}>{statusStyles[status].label}</span>
    )
}

export default StatusBadge;
