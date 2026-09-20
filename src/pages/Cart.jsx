import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import CartItems from "../components/Cartitems";
import CartSummary from "../components/Cartsummary";

export default function CartPage() {
  const { cart, loading } = useCart();

  const items = cart?.items || [];

  if (loading) {
    return <p className="p-10 text-center text-slate-500 dark:text-slate-400">Loading...</p>;
  }

  if (items.length === 0) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-lg font-medium text-slate-900 dark:text-white">Your cart is empty</h2>
        <Link
          to="/products"
          className="mt-4 inline-block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">Shopping Cart</h1>

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
          <CartItems />
          <CartSummary />
        </div>
      </div>
    </main>
  );
}