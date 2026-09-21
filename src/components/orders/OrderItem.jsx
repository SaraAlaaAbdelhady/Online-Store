import { useState } from "react";

function OrderItem({ item }) {
    const [imageError, setImageError] = useState(false);
    const [ imageLoaded, setImageLoaded ] = useState(false);

    const itemTotal = item.quantity * item.price;

    const showPlaceholder = !item.image || imageError || !imageLoaded;

    return(
        <div className="flex items-center justify-between gap-4 mt-4">
            <div className="flex items-center gap-2 md:gap-4">
                {/* photo + placeholder (item) */}
                <div className="w-10 h-10 sm:w-14 sm:h-14">
                    {showPlaceholder && (
                        <div className="bg-slate-200 w-full h-full flex items-center justify-center rounded-lg">
                            <span className="font-semibold text-base text-slate-400">Item</span>
                        </div>
                    )} 
                    {item.image && !imageError && (
                        <img 
                            src={item.image}
                            alt={item.name}
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                            className={`rounded-lg w-full h-full object-cover ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                        />
                    )}
                </div>
                {/* quantity */}
                <span className="text-xs text-slate-400 font-medium">{`Qty: ${item.quantity} × EGP ${item.price}`}</span>
            </div>
            <div>
                {/* totalPrice */}
                <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">{`EGP ${itemTotal}`}</span>
            </div>
        </div>
    );
}

export default OrderItem;
