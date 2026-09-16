import { HiOutlineEnvelope } from "react-icons/hi2";

function StayUpdated() {
    return (
        <div className="bg-gray-50 p-5 md:p-16 flex items-center justify-center text-white">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl text-center p-10 space-y-4 w-full">
                < HiOutlineEnvelope className="w-12 h-12 mx-auto text-indigo-100" />
                <h2 className="text-3xl font-bold">Stay Updated</h2>
                <p className="text-indigo-100 max-w-md mx-auto text-lg">Subscribe to our newsletter and get exclusive deals and new arrivals first.</p>

                <form className="flex flex-col sm:flex-row justify-center gap-3 mx-auto max-w-md">
                    <input type="email"
                        placeholder="Enter Your Email"
                        className="bg-white/15 border-2 rounded-xl border-white/20 p-3 focus:outline-none focus:ring-2 focus:ring-white/50 flex-1" />
                    <button className="rounded-xl bg-white font-semibold text-indigo-600 px-6 py-3 text-lg cursor-pointer hover:bg-indigo-50">Subscribe</button>
                </form>
            </div>
        </div>
    );
}

export default StayUpdated;