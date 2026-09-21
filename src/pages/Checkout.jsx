import { useState } from "react";
import { useCart } from "../contexts/CartContext";

export default function Checkout() {
  const { cart } = useCart();
  const items = cart?.items || [];
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    country: "Egypt",
    city: "",
    address: "",
    postalCode: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          country: formData.country,
          city: formData.city,
          address: formData.address,
          postalCode: formData.postalCode,
        },
        paymentMethod: "Cash on Delivery",
        notes: formData.notes,
        items: items,
      };

      console.log("Sending order data...", orderData);
      await new Promise((resolve) => setTimeout(resolve, 1000));  
      
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingCost = 50;  
  const total = subtotal + (items.length > 0 ? shippingCost : 0);  

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 px-6 py-10 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="grid items-start gap-8 lg:grid-cols-[1fr_400px]">
            <div className="space-y-6">
            
            {/* 1. Shipping Address */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-colors">
              <h2 className="mb-6 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Country <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 md:w-1/2"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-colors">
              <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </span>
                Payment Method
              </h2>

              <div className="flex items-center gap-4 rounded-xl border-2 border-indigo-600 bg-indigo-50/30 dark:bg-indigo-950/20 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Cash on Delivery</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Pay when you receive your order</p>
                </div>
              </div>
            </div>

            {/* 3. Order Notes */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-colors">
              <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </span>
                Order Notes (Optional)
              </h2>

              <textarea
                rows={3}
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special instructions for your order..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3.5 text-sm text-slate-800 dark:text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              ></textarea>
            </div>

          </div>

          <div className="lg:sticky lg:top-6 self-start rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-colors">
            <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">Order Summary</h2>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-60 overflow-y-auto">
              {items.length > 0 ? (
                items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 py-3">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                      <img src={item.product?.imageCover || item.image || "https://via.placeholder.com/100"} alt="Product" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="truncate text-xs font-medium text-slate-900 dark:text-slate-200">{item.product?.title || item.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">x{item.quantity}</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">EGP {item.price * item.quantity}</span>
                  </div>
                ))
              ) : (
                <p className="py-4 text-center text-xs text-slate-500 dark:text-slate-400">No items in cart</p>
              )}
            </div>

            <div className="mt-4 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4 text-sm">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900 dark:text-slate-200">EGP {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping</span>
                <span className="font-medium text-slate-900 dark:text-slate-200">EGP {shippingCost}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between border-t border-slate-100 dark:border-slate-800 pt-4 text-base font-bold text-slate-900 dark:text-white">
              <span>Total</span>
              <span className="text-indigo-600 dark:text-indigo-400">EGP {total.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="mt-6 w-full rounded-xl bg-indigo-600 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-200 dark:shadow-none transition hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}