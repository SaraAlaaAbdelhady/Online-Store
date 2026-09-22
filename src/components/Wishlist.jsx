import { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";

const Wishlist = () => {
  const {
    wishlist,
    loading: wishlistLoading,
    removeFromWishlist,
  } = useWishlist();

  const { addItemToCart } = useCart();

  const [addingToCart, setAddingToCart] = useState(null);
  const [removing, setRemoving] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const handleAddToCart = async (productId) => {
    try {
      setAddingToCart(productId);

      await addItemToCart(productId, 1);

      showToast("Added to cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setAddingToCart(null);
    }
  };

  const handleRemove = async (productId) => {
    try {
      setRemoving(productId);

      await removeFromWishlist(productId);

      showToast("Removed from wishlist");
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    } finally {
      setRemoving(null);
    }
  };

  /* =========================
     Loading State
  ========================= */
  if (wishlistLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950">

        {/* Main */}
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[954px]">

            {/* Page Title */}
            <div className="mb-7">
              <div className="h-7 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>
            </div>

            {/* Loading Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900"
                >
                  <div className="h-[220px] animate-pulse bg-gray-200 dark:bg-gray-800"></div>

                  <div className="p-3">
                    <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>

                    <div className="mt-3 h-5 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>

                    <div className="mt-3 h-8 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"></div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    );
  }

  /* =========================
     Empty Wishlist
  ========================= */
  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950">

        {/* Main */}
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[954px]">

            {/* Page Title */}
            <div className="mb-7">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white sm:text-2xl">
                My Wishlist
              </h1>
            </div>

            {/* Empty Wishlist */}
            <div className="flex min-h-[330px] flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-6 text-center shadow-sm dark:border-gray-700 dark:bg-slate-900">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800">
                <i className="fa-regular fa-heart text-3xl text-gray-300 dark:text-slate-400"></i>
              </div>

              <h2 className="mt-5 text-lg font-semibold text-gray-800 dark:text-white">
                Your wishlist is empty
              </h2>

              <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-slate-400">
                You haven't added any products to your wishlist yet.
              </p>

              <Link
                to="/shop"
                className="mt-5 flex h-9 items-center justify-center rounded-lg bg-indigo-600 px-5 text-xs font-semibold text-white transition hover:bg-indigo-700 dark:bg-[#2368e9] dark:hover:bg-[#0ec4ec]"
              >
                Continue Shopping
              </Link>

            </div>

          </div>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    );
  }

  /* =========================
     Wishlist Page
  ========================= */
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950">

      {/* Toast */}
      {toast && (
        <div className="fixed right-5 top-5 z-50 flex items-center gap-2 rounded-lg bg-[#111827] px-3 py-2 shadow-lg dark:bg-gray-900">

          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500">
            <i className="fa-solid fa-check text-[10px] text-white"></i>
          </div>

          <span className="text-xs font-medium text-white">
            {toast}
          </span>

        </div>
      )}

      {/* Main Content */}
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[954px]">

          {/* Page Header */}
          <div className="mb-7">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white sm:text-2xl">
              My Wishlist
            </h1>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {wishlist.map((product) => {
              const productId = product._id;

              const image = product.images?.[0]?.url;

              const price = Number(product.price);
              const discountPrice = Number(product.discountPrice);

              const hasValidDiscount =
                discountPrice > 0 &&
                discountPrice < price;

              const currentPrice = hasValidDiscount
                ? discountPrice
                : price;

              const isAdding = addingToCart === productId;
              const isRemoving = removing === productId;

              return (
                <div
                  key={productId}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
                >

                  {/* Product Image */}
                  <div className="relative h-[220px] overflow-hidden bg-gray-50 dark:bg-gray-800">

                    {image ? (
                      <img
                        src={image}
                        alt={product.name || "Product"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-300 dark:text-slate-400">
                        <i className="fa-regular fa-image text-4xl"></i>
                      </div>
                    )}

                  </div>

                  {/* Product Information */}
                  <div className="flex min-h-[95px] flex-col border-t border-gray-100 bg-white p-3 dark:border-gray-700 dark:bg-slate-900">

                    {/* Product Name */}
                    <h2 className="line-clamp-2 min-h-[36px] text-[11px] font-medium leading-[18px] text-gray-700 dark:text-slate-300">
                      {product.name || "Unnamed Product"}
                    </h2>

                    {/* Price */}
                    <div className="mt-1 flex min-h-[20px] items-center gap-1.5">

                      <span className="text-sm font-bold text-indigo-600 dark:text-[#0ec4ec]">
                        EGP {currentPrice.toLocaleString()}
                      </span>

                      {hasValidDiscount && (
                        <span className="text-[10px] text-gray-400 line-through dark:text-slate-500">
                          EGP {price.toLocaleString()}
                        </span>
                      )}

                    </div>

                    {/* Cart + Remove */}
                    <div className="mt-2 flex items-center gap-2">

                      {/* Add To Cart */}
                      <button
                        type="button"
                        disabled={isAdding}
                        onClick={() => handleAddToCart(productId)}
                        className={`flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg text-[11px] font-semibold text-white transition ${
                          isAdding
                            ? "cursor-not-allowed bg-indigo-400 dark:bg-gray-700"
                            : "bg-indigo-600 hover:bg-indigo-700 dark:bg-[#2368e9] dark:hover:bg-[#0ec4ec]"
                        }`}
                      >
                        <i
                          className={
                            isAdding
                              ? "fa-solid fa-spinner fa-spin text-[10px]"
                              : "fa-solid fa-cart-shopping text-[10px]"
                          }
                        ></i>

                        {isAdding ? "Adding..." : "Add to Cart"}
                      </button>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => handleRemove(productId)}
                        disabled={isRemoving}
                        aria-label="Remove from wishlist"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-800"
                      >
                        <i
                          className={
                            isRemoving
                              ? "fa-solid fa-spinner fa-spin text-[10px]"
                              : "fa-regular fa-trash-can text-[11px]"
                          }
                        ></i>
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};


/* Footer */

const Footer = () => {
  return (
    <footer className="mt-6 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900">

      <div className="mx-auto max-w-[954px] px-4 py-8 sm:px-6 lg:px-0">

        {/* Footer Content */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">

          {/* Store Info */}
          <div>

            <Link
              to="/"
              className="flex items-center gap-2 text-base font-bold text-indigo-600 dark:text-[#0ec4ec]"
            >
              <i className="fa-solid fa-bolt text-sm"></i>
              Koda Store
            </Link>

            <p className="mt-3 max-w-[250px] text-[11px] leading-5 text-gray-500 dark:text-slate-400">
              Shop the future, delivered today. Premium products at the best
              prices with fast delivery across Egypt.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-xs font-semibold text-gray-800 dark:text-white">
              Quick Links
            </h3>

            <div className="mt-3 flex flex-col gap-2">

              <Link
                to="/shop"
                className="w-fit text-[11px] text-gray-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-[#0ec4ec]"
              >
                Shop
              </Link>

              <Link
                to="/orders"
                className="w-fit text-[11px] text-gray-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-[#0ec4ec]"
              >
                My Orders
              </Link>

              <Link
                to="/wishlist"
                className="w-fit text-[11px] text-gray-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-[#0ec4ec]"
              >
                Wishlist
              </Link>

              <Link
                to="/profile"
                className="w-fit text-[11px] text-gray-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-[#0ec4ec]"
              >
                Profile
              </Link>

            </div>

          </div>

          {/* Follow Us */}
          <div>

            <h3 className="text-xs font-semibold text-gray-800 dark:text-white">
              Follow Us
            </h3>

            <div className="mt-3 flex items-center gap-2">

              <button
                type="button"
                aria-label="Website"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition hover:bg-indigo-50 hover:text-indigo-600 dark:bg-gray-800 dark:text-slate-400 dark:hover:bg-gray-700 dark:hover:text-[#0ec4ec]"
              >
                <i className="fa-solid fa-globe text-[11px]"></i>
              </button>

              <button
                type="button"
                aria-label="Chat"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition hover:bg-indigo-50 hover:text-indigo-600 dark:bg-gray-800 dark:text-slate-400 dark:hover:bg-gray-700 dark:hover:text-[#0ec4ec]"
              >
                <i className="fa-regular fa-comment text-[11px]"></i>
              </button>

              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition hover:bg-indigo-50 hover:text-red-500 dark:bg-gray-800 dark:text-slate-400 dark:hover:bg-gray-700 dark:hover:text-red-500"
              >
                <i className="fa-regular fa-heart text-[11px]"></i>
              </Link>

            </div>

          </div>

        </div>

        {/* Copyright */}
        <div className="mt-7 border-t border-gray-200 pt-5 text-center dark:border-gray-700">

          <p className="text-[10px] text-gray-400 dark:text-slate-500">
            © 2026 Koda Store. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Wishlist;