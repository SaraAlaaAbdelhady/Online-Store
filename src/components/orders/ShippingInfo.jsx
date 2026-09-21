import { GrLocation } from "react-icons/gr";

function ShippingInfo({ orderShipping }) {
    return(
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-0 md:mb-6 p-5">
            <div className="flex items-center gap-2 font-semibold mb-3">
                {/* header + icon */}
                <GrLocation size={20} className="text-blue-600"/>
                <h2 className="text-slate-800 dark:text-slate-200 text-lg">Shipping Address</h2>
            </div>

            <div className="flex flex-col font-medium text-sm text-slate-600 dark:text-slate-300 space-y-1">
                {/* fullName */}
                <span>{orderShipping.fullName}</span>
                {/* city, country */}
                <span>{`${orderShipping.city}, ${orderShipping.country}`}</span>
                {/* address */}
                <span>{orderShipping.address}</span>
                {/* phone number */}
                <span>{orderShipping.phone.replace(/^\D+/, "")}</span>
            </div>

        </div>
    )
}

export default ShippingInfo;
