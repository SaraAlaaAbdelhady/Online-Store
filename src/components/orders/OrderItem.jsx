import { useState } from "react";

function OrderItem({ item }) {
    const [imageError, setImageError] = useState(false);
    const itemTotal = item.quantity * item.price;

    return(
        <div className="flex items-center justify-between gap-4 mt-4">
            <div className="flex items-center gap-4">
                {/* photo + placeholder (item) */}
                <div className="w-14 h-14">
                    {imageError ? (
                        <div className="bg-slate-100 w-full h-full flex items-center justify-center rounded-lg">
                            <span className="font-semibold text-lg text-slate-400">Item</span>
                        </div>
                    ) : (
                        <img 
                            src={item.image}
                            alt={item.name}
                            onError={() => setImageError(true)}
                            className="rounded-lg w-full h-full object-cover"
                        />
                    )}
                </div>
                {/* quantity */}
                <span className="text-xs text-slate-400 font-medium">{`Qty: ${item.quantity} × EGP ${item.price}`}</span>
            </div>
            <div>
                {/* totalPrice */}
                <span className="font-semibold text-sm text-slate-700">{`EGP ${itemTotal}`}</span>
            </div>
        </div>
    );
}

export default OrderItem;
