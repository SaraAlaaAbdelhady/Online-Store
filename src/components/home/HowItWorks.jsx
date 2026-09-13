import { HiOutlineShoppingBag, HiOutlineCreditCard, HiOutlineTruck } from "react-icons/hi2";

function HowItWorks() {
    return (
        <div className="bg-gray-50 p-16 flex flex-col justify-center items-center gap-16 text-slate-800">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-2">

                    < HiOutlineShoppingBag className="w-16 h-16 mx-auto text-indigo-600 mb-4 p-4 bg-indigo-100 rounded-xl" />

                    <p className="text-xl font-bold">Browse Products</p>
                    <p className="text-slate-400">Explore our wide range of premium products</p>
                </div>

                <div className="text-center space-y-2">

                    < HiOutlineCreditCard className="w-16 h-16 mx-auto text-indigo-600 mb-4 p-4 bg-indigo-100 rounded-xl" />

                    <p className="text-xl font-bold">Add to Cart</p>
                    <p className="text-slate-400">Select your favorites and add them to your cart</p>
                </div>

                <div className="text-center space-y-2">

                    <HiOutlineTruck className="w-16 h-16 mx-auto text-indigo-600 mb-4 p-4 bg-indigo-100 rounded-xl" />

                    <p className="text-xl font-bold">Order & Receive</p>
                    <p className="text-slate-400">Place your order and get it delivered to your doorstep</p>
                </div>
            </div>
        </div>
    );
}

export default HowItWorks;