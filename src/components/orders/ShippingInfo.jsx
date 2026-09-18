import { GrLocation } from "react-icons/gr";

function ShippingInfo({ orderShipping }) {
    return(
        <div className="bg-white rounded-xl border border-slate-200 mb-0 md:mb-6 p-5">
            <div className="flex items-center gap-2 font-semibold mb-3">
                {/* header + icon */}
                <GrLocation size={20} className="text-blue-600"/>
                <h2 className="text-slate-800 text-lg">Shipping Address</h2>
            </div>

            <div className="flex flex-col font-medium text-sm text-slate-600 space-y-1">
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
