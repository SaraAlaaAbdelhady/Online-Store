import { useState } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../contexts/ProductContext";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useNavigate } from "react-router-dom";


const FeaturedProducts = () => {
  const { products, loading } = useProduct();
  const { addItemToCart } = useCart();
  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();


  const [addingProductId, setAddingProductId] = useState(null);
  const [toast, setToast] = useState("");
    const navigate = useNavigate();


const featuredProducts = (products || [])
    .filter((product) => product.featured === true)
    .slice(0, 8);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const handleAddToCart = async (productId) => {
    try {
      setAddingProductId(productId);

      await addItemToCart(productId, 1);

      showToast("Added to cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setAddingProductId(null);
    }
  };

  const handleWishlistToggle = async (productId) => {
    console.log("Wishlist product ID:", productId);

    try {
      const isInWishlist = wishlist.some(
        (item) => item._id === productId
      );

      if (isInWishlist) {
        await removeFromWishlist(productId);
        showToast("Removed from wishlist");
      } else {
        await addToWishlist(productId);
        showToast("Added to wishlist");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  if (loading) {
    return (

      <section className="min-h-screen bg-white px-4 py-12 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1400px]">

          {/* Loading Header */}
          <div className="mb-10">
            <div className="h-9 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>

            <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>
          </div>

          {/* Loading Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900"
              >
                <div className="h-[250px] animate-pulse bg-gray-100 dark:bg-gray-800"></div>

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

  return (

    <section className="relative  px-4 py-12 sm:px-6 lg:px-8">

      {/* Toast */}
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

      <div className="mx-auto max-w-[1200px]">

        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Featured Products
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-slate-400 sm:text-base">
              Discover our handpicked products just for you
            </p>
          </div>

          {/* View All */}
          <Link
            to="/shop"
            className="flex w-fit items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800 dark:text-[#0ec4ec] dark:hover:text-cyan-300"
          >
            View All
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </Link>

        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {featuredProducts.map((product) => {
            console.log("Product:", product.name, product._id);

            const price = Number(product.price);
            const discountPrice = Number(product.discountPrice);

            const hasValidDiscount =
              discountPrice > 0 &&
              discountPrice < price;

            const currentPrice = hasValidDiscount
              ? discountPrice
              : price;

            const discountPercentage = hasValidDiscount
              ? Math.round(((price - discountPrice) / price) * 100)
              : 0;

            const image = product.images?.[0]?.url;

            const rating = Number(product.averageRating) || 0;

            const isAdding = addingProductId === product._id;

            const isInWishlist = wishlist.some(
              (item) => item._id === product._id
            );

            return (
              <div
                key={product._id}
                                        onClick={() => navigate(`/products/${product._id}`)}

                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900"
              >

                {/* Top Badges */}
                <div className="absolute left-0 right-0 top-2 z-20 flex items-center justify-between gap-2 px-4">

                  {/* Category */}
                  <span className="max-w-[48%] truncate rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-gray-800 dark:text-[#0ec4ec]">
                    {product.category || "electronics"}
                  </span>

                  {/* Discount + Heart */}
                  <div className="flex items-center gap-2">

                    {discountPercentage > 0 && (
                      <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 dark:bg-gray-800 dark:text-slate-300">
                        -{discountPercentage}%
                      </span>
                    )}

                    {/* Wishlist */}
                    <button
                      type="button"
                      aria-label={
                        isInWishlist
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                      onClick={() =>
                        handleWishlistToggle(product._id)
                      }
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white transition dark:bg-gray-800 ${
                        isInWishlist
                          ? "text-red-500"
                          : "text-gray-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-cyan-300"
                      }`}
                    >
                      <i
                        className={
                          isInWishlist
                            ? "fa-solid fa-heart text-base"
                            : "fa-regular fa-heart text-base"
                        }
                      ></i>
                    </button>

                  </div>
                </div>

                {/* Image */}
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

                {/* Product Info */}
                <div className="flex min-h-[245px] flex-col border-t border-gray-100 bg-white p-5 dark:border-gray-700 dark:bg-slate-900">

                  {/* Product Name */}
                  <h3 className="line-clamp-2 min-h-[48px] text-base font-medium leading-6 text-gray-800 dark:text-slate-300">
                    {product.name}
                  </h3>

                  {/* Rating */}
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

                  {/* Price */}
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

                  {/* Add To Cart */}
                  <button
                    type="button"
                    disabled={isAdding}
                    onClick={() =>
                      handleAddToCart(product._id)
                    }
                    className={`mt-auto flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition ${
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

                </div>
              </div>
            );
          })}

        </div>

        {/* No Featured Products */}
        {featuredProducts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">

            <i className="fa-solid fa-box-open text-4xl text-gray-300 dark:text-slate-700"></i>

            <p className="mt-4 text-gray-500 dark:text-slate-400">
              No featured products available.
            </p>

          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedProducts;