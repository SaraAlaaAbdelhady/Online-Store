import OrderItems from "../components/orders/OrderItems"
import OrderProgress from "../components/orders/OrderProgress"
import ShippingInfo from "../components/orders/ShippingInfo"
import PaymentInfo from "../components/orders/PaymentInfo"
import { useOrder } from "../contexts/OrderContext"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import StatusBadge from "../components/orders/StatusBadge"
import { IoIosCloseCircleOutline } from "react-icons/io";
import ErrorMsg from "../components/orders/ErrorMsg"
import LoadingSpinner from "../components/orders/LoadingSpinner"


function OrderDetails() {
    const { id } = useParams();

    const { getMyOrderById, cancelMyOrder } = useOrder();

    const [ order, setOrder ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState("")
    const [ cancelling, setCancelling ] = useState(false)
    const [ showCancelConfirm, setShowCancelConfirm ] = useState(false);

    useEffect(() => {
        const fetchOrderById = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await getMyOrderById(id);
                setOrder(res.order);
            } catch (err) {
                setError(err.message || "Failed to load order.");
            } finally {
                setLoading(false)
            }
        }
        fetchOrderById();
    }, [id, getMyOrderById])

    if (loading) return <LoadingSpinner />

    if (error) return <ErrorMsg message={error}/>

    if (!order) return null;

    const cancelConfirm = () => {
        setShowCancelConfirm(true);
    }

    const handleCancelOrder = async () => {
        try {
            setCancelling(true);
            setError("");
            const res = await cancelMyOrder(id);
            setOrder(res.order)
            setShowCancelConfirm(false);
        } catch (err) {
            setError(err.message || "Failed to cancel order.");
        } finally {
            setCancelling(false);
        }
    }

    

    const canCancel = ["pending", "confirmed"].includes(order.status)

    return(
        <div className="bg-gray-100/50 dark:bg-slate-900">
            <div className="p-6 md:p-8 max-w-4xl mx-auto"> 
                {/* header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Order Details</h2>
                        <span className="text-sm text-slate-500 mt-1 font-medium">{`Order #${order._id.slice(-8).toUpperCase()}`}</span>
                    </div>
                    <StatusBadge status={order.status}/>
                </div>
                {/* page */}
                <OrderProgress status={order.status} />
                <OrderItems orderItems={order.items} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <ShippingInfo orderShipping={order.shippingAddress} />
                    <PaymentInfo order={order} />
                </div>
                {/* cancel button */}
                {canCancel && (
                    <button
                        onClick={cancelConfirm}
                        className="flex items-center mx-auto justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm text-white px-4 py-2 font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <IoIosCloseCircleOutline size={16} />
                        Cancel Order
                    </button>
                )}
                {/* cancel confirmation */}
                {showCancelConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-sm w-full mx-4 slide-up">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Cancel Order?</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Are you sure you want to cancel this order? This action cannot be undone.</p>
                            <div className="mt-6 flex justify-end gap-3 ">
                                <button
                                    onClick={() => setShowCancelConfirm(false)}
                                    disabled={cancelling}
                                    className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 transition-colors hover:bg-slate-200 dark:hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Keep Order
                                </button>
                                <button
                                    onClick={handleCancelOrder}
                                    disabled={cancelling}
                                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {cancelling ? "Cancelling..." : "Cancel Order"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderDetails;
