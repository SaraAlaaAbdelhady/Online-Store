import { BsBoxSeam } from "react-icons/bs";
import OrderItem from "./OrderItem"

function OrderItems({ orderItems }) {
    return(
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-6 p-5">
            <div className="flex items-center gap-2 font-semibold">
                {/* header + icon */}
                <BsBoxSeam size={16} className="text-blue-600"/>
                <h2 className="text-slate-800 dark:text-slate-200 text-lg">Items</h2>
            </div>
            {orderItems.map((item) => (
                <OrderItem item={item} key={item.product} />
            ))} 
        </div>
    );   
}

export default OrderItems;
