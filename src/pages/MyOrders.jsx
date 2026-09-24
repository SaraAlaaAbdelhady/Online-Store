import { useOrder } from "../contexts/OrderContext";
import { useState, useEffect } from "react";
import OrderCard from "../components/orders/OrderCard";
import { Link, useNavigate } from "react-router-dom";
import { BsBoxSeam } from "react-icons/bs";
import ErrorMsg from "../components/orders/ErrorMsg";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";


function MyOrders() {
    const { getMyOrders } = useOrder();
    const navigate = useNavigate();

    // states: orders, loading, error, page, status
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [paginationLoading, setPaginationLoading] = useState(false);
    const [error, setError] = useState(null);

    // useEffect on mount 
    useEffect(() => {
        const fetchOrders = async () => {
            if (page === 1 && orders.length === 0) {
                setLoading(true);
            } else {
                setPaginationLoading(true);
            }
            setError("");
            try{
                const res = await getMyOrders(page, 10)
                setOrders(res.orders);
                setTotal(res.total)
                setTotalPages(res.totalPages)
            } catch(err) {
                if (err.message === "Not authorized, no token") {
                    navigate("/login");
                    return;
                }

                setError(err.message);
            } finally {
                setLoading(false);
                setPaginationLoading(false);
            }
        };
        fetchOrders();
    }, [page])

    // show loading indicator while loading instead of list
    if (loading) return <LoadingSpinner />

    // if error: show error message
    if (error) return <ErrorMsg />

    // if orders is empty: no orders yet and navigate to shop
    if (!loading && total === 0) {
        return(
            <div className="flex min-h-[400px] w-full items-center justify-center p-6 text-center dark:bg-slate-900">
                <div className="flex w-full max-w-[400px] flex-col items-center">
                    <div className="rounded-full w-16 h-16 bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                        <BsBoxSeam size={30} className="text-lg text-slate-400"/>
                    </div>
                    <h3 className="mt-6 mb-3 text-lg font-semibold text-slate-900 dark:text-slate-200">No orders yet</h3>
                    <p className="text-base font-medium text-slate-400 mb-6">You haven't placed any orders yet. Start shopping to see your orders here.</p>
                    <Link to="/shop" className="inline-flex items-center justify-center rounded-lg bg-blue-500 dark:bg-blue-700 px-5 py-2.5 text-sm font-medium text-white dark:text-slate-200 transition-colors hover:bg-blue-400 dark:hover:bg-blue-600 focus:outline-none">Start Shopping</Link>
                </div>
            </div>
        )
    }
    

    // otherwise: map over orders, render an OrderCard per order
    return(
        <div className="bg-gray-100/50 dark:bg-slate-900">
            <div className="px-11 py-12 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 dark:text-slate-200">My Orders</h2>
                {orders.map(order => (
                    <OrderCard key={order._id} order={order} />
                ))}
                <Pagination 
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    paginationLoading={paginationLoading}
                />
            </div>
        </div>
    )
}

export default MyOrders;
