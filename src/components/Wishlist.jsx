import { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import { BiHeart } from "react-icons/bi";

const Wishlist = () => {
  const { wishlist, loading: wishlistLoading, removeFromWishlist } = useWishlist();
  const { addItemToCart } = useCart();

  const [addingToCart, setAddingToCart] = useState(null);
  const [removing, setRemoving] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
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

  if (wishlistLoading) {
    return (
      <section className="min-h-screen bg-white px-4 py-12 dark:bg-slate-950 px-12 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10">
            <div className="h-9 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>
            <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900"
              >
                <div className="h-25px] animate-pulse bg-gray-100 dark:bg-gray-800"></div>
                <div className="p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>
                  <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>
                  <div className="mt-5 h-6 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>
                  <div className="mt-5 h-11 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center p-6 text-center dark:bg-slate-900">
        <div className="flex w-full max-w-[400px] flex-col items-center">
          <div className="rounded-full w-16 h-16 bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
            <BiHeart size={30} className="text-lg text-slate-400"/>
          </div>
          <h3 className="mt-6 mb-3 text-lg font-semibold text-slate-900 dark:text-slate-200">Your wishlist is empty</h3>
          <p className="text-base font-medium text-slate-400 mb-6">Save items you love to your wishlist. They'll be waiting for you here.</p>
          <Link
            to="/shop"
            className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="relative px-4 py-12 sm:px-6 lg:px-8">
      {toast && (
        <div className="fixed right-6 top-6 z-50 flex w-fit max-w-[220px] items-center gap-2 rounded-xl bg-[#111827] px-3 py-2.5 shadow-xl dark:bg-gray-900">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500">
            <i className="fa-solid fa-check text-[10px] text-white"></i>
          </div>
          <span className="whitespace-nowrap text-xs font-medium text-white">
            {toast}
          </span>
        </div>
      )}

      <div className="mx-auto max-w-[1200px] px-10  sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              My Wishlist
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-slate-400 sm:text-base">
              Products you've saved for later
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {wishlist.map((product) => {
            const productId = product._id;
            const price = Number(product.price);
            const discountPrice = Number(product.discountPrice);
            const hasValidDiscount = discountPrice > 0 && discountPrice < price;
            const currentPrice = hasValidDiscount ? discountPrice : price;
            const discountPercentage = hasValidDiscount
              ? Math.round(((price - discountPrice) / price) * 100)
              : 0;
            const image = product.images?.[0]?.url;
            const rating = Number(product.averageRating) || 0;
            const isAdding = addingToCart === productId;
            const isRemoving = removing === productId;

            return (
              <div
                key={productId}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900"
              >
                {/* نفس Badges بتاعة FeaturedProducts */}
                <div className="absolute left-0 right-0 top-2 z-20 flex items-center justify-between gap-2 px-4">
                  <span className="max-w-[48%] truncate rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-gray-800 dark:text-[#0ec4ec]">
                    {product.category || "electronics"}
                  </span>

                  {discountPercentage > 0 && (
                    <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 dark:bg-gray-800 dark:text-slate-300">
                      -{discountPercentage}%
                    </span>
                  )}
                </div>

                {/* نفس مساحة الصورة 300px */}
                <div className="relative z-0 h-[250px] overflow-hidden bg-gray-50 px-4 py-4 dark:bg-gray-800">
                  {image ? (
                    <img
                      src={image}
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400 dark:text-slate-400">
                      <i className="fa-regular fa-image text-4xl"></i>
                    </div>
                  )}
                </div>

                {/* نفس بلوك المعلومات */}
                <div className="flex min-h-[245px] flex-col border-t border-gray-100 bg-white p-5 dark:border-gray-700 dark:bg-slate-900">
                  <h3 className="line-clamp-2 min-h-[48px] text-base font-medium leading-6 text-gray-800 dark:text-slate-300">
                    {product.name || "Unnamed Product"}
                  </h3>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i
                          key={star}
                          className={`fa-solid fa-star text-sm ${
                            star <= Math.round(rating)
                              ? "text-yellow-400"
                              : "text-gray-200 dark:text-gray-700"
                          }`}
                        ></i>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-slate-400">
                      ({product.numReviews || 0})
                    </span>
                  </div>

                  <div className="mt-5 flex min-h-[30px] items-center gap-2">
                    <span className="text-xl font-bold text-indigo-600 dark:text-[#0ec4ec]">
                      EGP {currentPrice.toLocaleString()}
                    </span>
                    {hasValidDiscount && (
                      <span className="text-sm text-gray-400 dark:text-slate-500 line-through">
                        EGP {price.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* نفس زراير الـ Wishlist الأصلية: Add to Cart + Remove */}
                  <div className="mt-auto flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isAdding}
                      onClick={() => handleAddToCart(productId)}
                      className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition ${
                        isAdding
                          ? "cursor-not-allowed bg-indigo-400 dark:bg-gray-700"
                          : "bg-indigo-600 hover:bg-indigo-700 dark:bg-[#2368e9] dark:hover:bg-[#0ec4ec]"
                      }`}
                    >
                      <i
                        className={
                          isAdding
                            ? "fa-solid fa-spinner fa-spin"
                            : "fa-solid fa-cart-shopping"
                        }
                      ></i>
                      {isAdding ? "Adding..." : "Add to Cart"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemove(productId)}
                      disabled={isRemoving}
                      aria-label="Remove from wishlist"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-red-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <i
                        className={
                          isRemoving
                            ? "fa-solid fa-spinner fa-spin text-sm"
                            : "fa-regular fa-trash-can text-sm"
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
    </section>
  );
};

export default Wishlist;