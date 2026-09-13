import { Link } from "react-router-dom"
import { HiOutlineGlobeAlt, HiOutlineHeart, HiOutlineBolt } from "react-icons/hi2";
import { FiMessageCircle } from "react-icons/fi";


function Footer() {
    return (
        <div className="bg-white border-t-2 border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-16">
                <div className="md:col-span-2 space-y-3">
                    <Link to="/" className="text-indigo-600 text-xl font-bold flex items-center gap-1">
                        <HiOutlineBolt className="text-3xl" /> Koda Store
                    </Link>
                    <p className="text-sm text-slate-500 max-w-xs">Shop the future, delivered today. Premium products at the best prices with fast delivery across Egypt.</p>
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 mb-3">Quick Links</h4>
                    <ul className="text-slate-500 text-sm space-y-2">
                        <li><a href="/shop" className="hover:text-indigo-600">Shop</a></li>
                        <li><a href="/orders" className="hover:text-indigo-600">My Orders</a></li>
                        <li><a href="/wishlist" className="hover:text-indigo-600">Wishlist</a></li>
                        <li><a href="/profile" className="hover:text-indigo-600">Profile</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 mb-3">Follow Us</h4>
                    <div className="flex items-center gap-3">
                        <HiOutlineGlobeAlt className="text-slate-600 hover:text-indigo-600 bg-indigo-50 rounded-full p-1 text-3xl cursor-pointer" />
                        <FiMessageCircle className="text-slate-600 hover:text-indigo-600 bg-indigo-50 rounded-full p-1 text-3xl cursor-pointer" />
                        <HiOutlineHeart className="text-slate-600 hover:text-indigo-600 bg-indigo-50 rounded-full p-1 text-3xl cursor-pointer" />
                    </div>
                </div>
            </div>

            <p className="text-center text-slate-400 p-8 text-sm border-t-2 border-slate-200">&copy; 2026 Koda Store. All rights reserved.</p>
        </div>
    );
}

export default Footer;