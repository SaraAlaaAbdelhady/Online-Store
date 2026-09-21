import formatDate from "../../utils/formatDate";
import StatusBadge from "./StatusBadge";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";


function OrderCard({ order }){
    // items logic
    const itemsLength = order?.items?.length;

    // Date formatted
    const date = formatDate(order.createdAt);

    return(
        <Link 
            to={`/orders/${order._id}`}
            className="flex items-center justify-between rounded-xl gap-3 p-5 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow mb-4 bg-white dark:bg-slate-800"
        >
            <div className="flex flex-col">
                <div className="flex gap-3 items-center justify-center">
                    {/* id */}
                    <span className="font-mono font-semibold text-sm text-slate-800 dark:text-slate-200">{`#${order._id.slice(-8).toUpperCase()}`}</span>
                    {/* status */}
                    <StatusBadge status={order.status} />
                </div>
                {/* Date */}
                <span className="text-sm text-slate-500">{date}</span>
                {/* item/items */}
                <span className="text-sm text-slate-400">{`${itemsLength} item(s)`}</span>
            </div>

            <div className="flex items-center gap-3">
                {/* totalPrice */}
                <span className="font-bold text-blue-700 text-base sm:text-lg truncate">{`EGP ${order.totalPrice}`}</span>
                {/* icon */}
                <MdKeyboardArrowRight size={24} className="text-gray-400" />
            </div>
        </Link>
    );
}

export default OrderCard;
