import { MdOutlineCircle } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function OrderProgress({ status }) {
    // define fixed sequence of steps: pending, confirmed, processing, shipped, delivered
    const progressSteps = ["pending", "confirmed", "processing", "shipped", "delivered"];

    // find current status index
    const currentIndex = progressSteps.indexOf(status)

    // if status is cancelled or returned, render nothing
    if (status === "cancelled" || status === "returned") {
        return null;
    }

    const progressPercent = (currentIndex / (progressSteps.length - 1)) * 100;

    return(
        <div className="bg-white rounded-xl border border-slate-200 mb-6 p-5">
            {/* header */}
            <h2 className="text-slate-800 text-lg font-semibold">Order Progress</h2>

            {/* progress bar */}
            <div className="relative flex justify-between mt-6">
                {/* gray track */}
                <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-200"></div>
                {/* blue track */}
                <div 
                    className="absolute top-4 left-4 h-0.5 bg-blue-500 transition-all duration-200" 
                    style={{width: `calc((100% - 2rem) * ${progressPercent / 100})`}}
                />
                
                {/* map over steps */}
                {progressSteps.map((step, index) => {
                    const isReached = index <= currentIndex;
                    return (
                        <div key={step} className="relative z-10 flex flex-col items-center w-8">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isReached ? "bg-blue-500 text-white" : "bg-slate-300 text-slate-400"}`}>
                                {isReached ? <IoMdCheckmarkCircleOutline size={18} /> : <MdOutlineCircle size={18} />}
                            </div>
                            <span className={`text-xs mt-2 font-medium whitespace-nowrap ${isReached ? "text-blue-600" : "text-slate-600"}`}>{step}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default OrderProgress;
