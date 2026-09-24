import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { useCart } from "../contexts/CartContext";

export default function CartItems() {
  const { cart, updateItemQuantity, removeItemFromCart, applyCoupon, removeCoupon } = useCart();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [deletingIds, setDeletingIds] = useState([]);

  const items = cart?.items || [];

  const handleQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await updateItemQuantity(productId, quantity);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemove = async (productId) => {
    setDeletingIds((prev) => [...prev, productId]);
    setError("")

    try {
      await removeItemFromCart(productId);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingIds((prev) => prev.filter((id) => id !== productId));
    }
  };

  const handleApply = async () => {
    if (!code.trim()) return;
    setError("");
    try {
      await applyCoupon(code.trim());
      setCode("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      await removeCoupon();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">

      {/* كارت المنتجات */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6">
        <ul className="divide-y divide-slate-200 dark:divide-slate-700">
          {items.map((item) => (
            <li key={item._id} className={`relative flex gap-4 py-5 ${deletingIds.includes(item.product) ? "pointer-events-none opacity-60" : ""}`}>
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 rounded-lg border border-slate-200 dark:border-slate-700 object-cover"
              />

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white">{item.name}</h3>
                    <p className="mt-1 font-semibold text-indigo-600 dark:text-indigo-400">EGP {item.price}</p>
                  </div>

                  <button
                    onClick={() => handleRemove(item.product)}
                    aria-label="Remove item"
                    className="text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <HiOutlineTrash size={20} />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => handleQuantity(item.product, item.quantity - 1)}
                      className="h-9 w-9 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm text-slate-900 dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantity(item.product, item.quantity + 1)}
                      className="h-9 w-9 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-semibold text-slate-900 dark:text-white">
                    EGP {item.price * item.quantity}
                  </span>
                </div>
              </div>
              {deletingIds.includes(item.product) && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/60 dark:bg-slate-800/60">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600 dark:border-slate-600 dark:border-t-blue-400" />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* كارت الكوبون */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
        <h2 className="font-medium text-slate-900 dark:text-white">Coupon Code</h2>

        {cart?.coupon ? (
          <div className="mt-4 flex items-center justify-between rounded-lg bg-emerald-50 dark:bg-emerald-900/30 px-4 py-3">
            <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">{cart.coupon}</span>
            <button
              onClick={handleRemoveCoupon}
              className="text-sm font-medium text-emerald-800 dark:text-emerald-300 hover:underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="mt-4 flex gap-3">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2.5 text-sm focus:border-indigo-600 focus:outline-none"
            />
            <button
              onClick={handleApply}
              className="rounded-lg border border-indigo-600 dark:border-indigo-400 px-6 py-2.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}