import { LuCreditCard } from "react-icons/lu";
import formatDate from "../../utils/formatDate"

function PaymentInfo({ order }) {
    // Date formatted
    const date = formatDate(order.createdAt)

    return(
        <div className="bg-white rounded-xl border border-slate-200 mb-0 md:mb-6 p-5">
            <div className="flex items-center gap-2 font-semibold mb-3">
                {/* header + icon */}
                <LuCreditCard size={20} className="text-blue-600" />
                <h2 className="text-slate-800 text-lg">Payment</h2>
            </div>
            {/* payment method */}
            <span className="text-base text-slate-500 font-medium inline-block mb-4">{order.paymentMethod.charAt(0).toUpperCase() + order.paymentMethod.slice(1)}</span>
            {/* line */}
            <div className="h-px bg-gradient-to-t from-transparent via-slate-200 to-transparent"></div>
            <div className="flex items-center justify-between font-bold text-sm pt-3">
                {/* totalPrice */}
                <p>Total</p>
                <span className="text-blue-700">{`EGP ${order.totalPrice}`}</span>
            </div>
            {/* placed on date */}
            <span className="text-sm text-slate-400 inline-block mt-2">{`Placed on ${date}`}</span>
        </div>
    )
}

export default PaymentInfo;
