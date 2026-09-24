import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import CartItems from "../components/Cartitems";
import CartSummary from "../components/Cartsummary";
import { CgShoppingCart } from "react-icons/cg";

export default function CartPage() {
  const { cart, loading } = useCart();

  const items = cart?.items || [];

  if (loading) {
    return <p className="p-10 text-center text-slate-500 dark:text-slate-400">Loading...</p>;
  }

  if (items.length === 0) {
    return (
     <>
      <div className="flex min-h-[400px] w-full items-center justify-center p-6 text-center dark:bg-slate-900">
        <div className="flex w-full max-w-[400px] flex-col items-center">
          <div className="rounded-full w-16 h-16 bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
            <CgShoppingCart size={30} className="text-lg text-slate-400"/>
          </div>
          <h3 className="mt-6 mb-3 text-lg font-semibold text-slate-900 dark:text-slate-200">Your cart is empty</h3>
          <p className="text-base font-medium text-slate-400 mb-6">Looks like you haven't added anything to your cart yet. Start shopping and find something you love!</p>
          <Link
            to="/shop"
            className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Start Shopping
          </Link>
        </div>
      </div>
     </>
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