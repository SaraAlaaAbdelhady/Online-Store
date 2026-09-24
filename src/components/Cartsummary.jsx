import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function CartSummary() {
  const { cart } = useCart();

  const subtotal = cart?.subtotal || 0;
  const discount = cart?.discountAmount || 0;

  const shipping = subtotal >= 1000 ? 0 : 50;
  const tax = Math.round((subtotal - discount) * 0.14);
  const total = subtotal - discount + shipping + tax;

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Order Summary</h2>

      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
          <span className="text-slate-900 dark:text-white">EGP {subtotal}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Discount</span>
            <span className="text-emerald-600 dark:text-emerald-400">− EGP {discount}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Shipping</span>
          <span className={shipping === 0 ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"}>
            {shipping === 0 ? "Free" : `EGP ${shipping}`}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Tax (14%)</span>
          <span className="text-slate-900 dark:text-white">EGP {tax}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between border-t border-slate-200 dark:border-slate-700 pt-4">
        <span className="font-semibold text-slate-900 dark:text-white">Total</span>
        <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">EGP {total}</span>
      </div>

      <Link
        to="/checkout"
        className="mt-6 block rounded-lg bg-indigo-600 py-3.5 text-center font-semibold text-white hover:bg-indigo-700"
      >
        Proceed to Checkout
      </Link>

      <Link
        to="/shop"
        className="mt-3 block text-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        Continue Shopping
      </Link>
    </div>
  );
}