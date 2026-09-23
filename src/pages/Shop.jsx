import { useState, useEffect, useCallback } from "react";
import { useProduct } from "../contexts/ProductContext";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "electronics", label: "Electronics" },
  { value: "phones", label: "Phones" },
  { value: "fashion", label: "Fashion" },
  { value: "beauty", label: "Beauty" },
  { value: "home", label: "Home" },
  { value: "sports", label: "Sports" },
];

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

function Shop() {
  const { searchProducts } = useProduct();
  const { addItemToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const byCategory = searchParams.get("category")

  // ////////////// filters state //////////////
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(byCategory || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");

  // debounced text values actually sent to the API
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debouncedMinPrice, setDebouncedMinPrice] = useState("");
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState("");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationLoading, setPaginationLoading] = useState(false);

  const [addingProductId, setAddingProductId] = useState(null);
  const [toast, setToast] = useState("");

  // ////////////// debounce search + price inputs //////////////
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setDebouncedMinPrice(minPrice);
      setDebouncedMaxPrice(maxPrice);
    }, 400);

    return () => clearTimeout(timer);
  }, [search, minPrice, maxPrice]);

  // ////////////// fetch products whenever filters change //////////////
  const fetchResults = useCallback(async () => {
    try {
      setLoading(page === 1);
      setPaginationLoading(page > 1)
      setError("");

      const data = await searchProducts({
        search: debouncedSearch || undefined,
        category: category || undefined,
        minPrice: debouncedMinPrice || undefined,
        maxPrice: debouncedMaxPrice || undefined,
        sort: sort || undefined,
        page,
      });

      const productsList = Array.isArray(data)
        ? data
        : Array.isArray(data?.products)
        ? data.products
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setResults(productsList);
      setTotalPages(data?.totalPages || 1)
    } catch (err) {
      setError(err.message || "Failed to load products.");
    } finally {
      setLoading(false);
      setPaginationLoading(false)
    }
  }, [debouncedSearch, category, debouncedMinPrice, debouncedMaxPrice, sort, page, searchProducts]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
    setPage(1);
  };

  const hasActiveFilters =
    search || category || minPrice || maxPrice || sort;

  // ////////////// cart / wishlist handlers //////////////
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

   const handleAddToCart = async (e, productId) => {
    e.stopPropagation();
    try {
      setAddingProductId(productId);
      await addItemToCart(productId, 1);
      showToast("Added to cart");
    } catch (err) {
      console.error("Error adding product to cart:", err);
      if (err?.message?.toLowerCase().includes("not authorized")) {
        showToast("Please login first");
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } else {
        showToast("Something went wrong");
      }
    } finally {
      setAddingProductId(null);
    }
  };

    const handleWishlistToggle = async (e, productId) => {
    e.stopPropagation();
    try {
      const isInWishlist = wishlist.some((item) => item._id === productId);

      if (isInWishlist) {
        await removeFromWishlist(productId);
        showToast("Removed from wishlist");
      } else {
        await addToWishlist(productId);
        showToast("Added to wishlist");
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
      if (err?.message?.toLowerCase().includes("not authorized")) {
        showToast("Please login first");
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } else {
        showToast("Something went wrong");
      }
    }
  };

  return (
    <section className="relative bg-gray-50 dark:bg-slate-950 px-4 py-5 sm:px-6 lg:px-10">
      {/* Toast */}
      {toast && (
        <div className="fixed right-6 top-6 z-50 flex w-fit max-w-[220px] items-center gap-2 rounded-xl bg-[#111827] dark:bg-slate-800 px-3 py-2.5 shadow-xl">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500">
            <i className="fa-solid fa-check text-xs text-white"></i>
          </div>
          <span className="whitespace-nowrap  font-medium text-white">
            {toast}
          </span>
        </div>
      )}

      <div className="mx-auto max-w-[1400px] px-8 py-6 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="relative mb-6">
          <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500"></i>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 pl-12 pr-4 text-sm text-gray-800 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Sidebar Filters */}
          <aside className="w-full shrink-0 lg:w-64">
            <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              {/* Category */}
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-slate-100">
                Category
              </h3>
              <div className="mb-6 flex flex-col gap-2.5">
                {CATEGORIES.map((c) => (
                  <label
                    key={c.value}
                    className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700 dark:text-slate-300"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={category === c.value}
                      onChange={() => setCategory(c.value)}
                      className="h-4 w-4 accent-indigo-600"
                    />
                    {c.label}
                  </label>
                ))}
              </div>

              {/* Price Range */}
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-slate-100">
                Price Range
              </h3>
              <div className="mb-6 flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min"
                  className="w-1/2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-gray-800 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <input
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max"
                  className="w-1/2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-gray-800 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Sort By */}
              <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-slate-100">
                Sort By
              </h3>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="mb-6 w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-gray-700 dark:text-slate-300 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                {SORT_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>

              {/* Clear */}
              <button
                type="button"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                  hasActiveFilters
                    ? "border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                    : "cursor-not-allowed border-gray-200 dark:border-slate-800 text-gray-300 dark:text-slate-600"
                }`}
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Results count */}
            {!loading && !error && (
              <p className="mb-4 text-sm text-gray-500 dark:text-slate-400">
                {results.length} {results.length === 1 ? "product" : "products"} found
              </p>
            )}

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 px-5 py-4 text-sm text-red-600 dark:text-red-300">
                {error}
              </div>
            )}

            {/* Loading Skeleton */}
            {loading ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div
                    key={item}
                    className="overflow-hidden rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  >
                    <div className="h-[260px] animate-pulse bg-gray-100 dark:bg-slate-800"></div>
                    <div className="p-5">
                      <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-slate-800"></div>
                      <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-slate-800"></div>
                      <div className="mt-5 h-6 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-slate-800"></div>
                      <div className="mt-5 h-11 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-slate-800"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length === 0 ? (
              /* Empty State */
              <div className="rounded-2xl border border-dashed border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-16 text-center">
                <i className="fa-solid fa-box-open text-4xl text-gray-300 dark:text-slate-700"></i>
                <p className="mt-4 text-gray-500 dark:text-slate-400">
                  No products match your search or filters.
                </p>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-4 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              /* Products Grid */
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {results.map((product) => {
                    const price = Number(product.price);
                    const discountPrice = Number(product.discountPrice);

                    const hasValidDiscount =
                      discountPrice > 0 && discountPrice < price;

                    const currentPrice = hasValidDiscount ? discountPrice : price;

                    const discountPercentage = hasValidDiscount
                      ? Math.round(((price - discountPrice) / price) * 100)
                      : 0;

                    const image = product.images?.[0]?.url;
                    const rating = Number(product.averageRating) || 0;
                    const inStock = Number(product.stock) > 0;
                    const isAdding = addingProductId === product._id;
                    const isInWishlist = wishlist.some(
                      (item) => item._id === product._id
                    );

                    return (
                      <div
                        key={product._id}
                          onClick={() => navigate(`/products/${product._id}`)}

                        className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                      >
                        {/* Top Badges */}
                        <div className="absolute left-0 right-0 top-3 z-20 flex items-center justify-between gap-2 px-3">
                          <span className="max-w-[48%] truncate rounded-full bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                            {product.category || "electronics"}
                          </span>

                          <div className="flex items-center gap-2">
                            {discountPercentage > 0 && (
                              <span className="rounded-full bg-red-50 dark:bg-red-950/40 px-3 py-1 text-xs font-semibold text-red-500 dark:text-red-300">
                                -{discountPercentage}%
                              </span>
                            )}

                            <button
                              type="button"
                              aria-label={
                                isInWishlist
                                  ? "Remove from wishlist"
                                  : "Add to wishlist"
                              }
                              onClick={(e) => handleWishlistToggle(e, product._id)}
                                                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm transition ${
                                isInWishlist
                                  ? "text-red-500"
                                  : "text-gray-400 dark:text-slate-400 hover:text-red-500"
                              }`}
                            >
                              <i
                                className={
                                  isInWishlist
                                    ? "fa-solid fa-heart text-sm"
                                    : "fa-regular fa-heart text-sm"
                                }
                              ></i>
                            </button>
                          </div>
                        </div>

                        {/* Image */}
                        <div className="relative z-0 h-[260px] overflow-hidden bg-gray-50 dark:bg-slate-800">
                          {image ? (
                            <img
                              src={image}
                              alt={product.name}
                              className={`h-full w-full object-cover transition-transform duration-500 ${inStock ? "group-hover:scale-105" : "opacity-50"}`}
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-gray-400 dark:text-slate-500">
                              <i className="fa-regular fa-image text-4xl"></i>
                            </div>
                          )}

                          {!inStock && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                              <span className="rounded-full bg-red-100 dark:bg-red-900/30 px-2 py-1 text-sm font-semibold text-red-700 dark:text-red-400">Out of Stock</span>
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex min-h-[210px] flex-col p-5">
                          <h3 className="line-clamp-2 min-h-[48px] text-base font-semibold leading-6 text-gray-900 dark:text-slate-100">
                            {product.name}
                          </h3>

                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <i
                                  key={star}
                                  className={`fa-solid fa-star text-sm ${
                                    star <= Math.round(rating)
                                      ? "text-yellow-400"
                                      : "text-gray-200 dark:text-slate-700"
                                  }`}
                                ></i>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-slate-400">
                              ({product.numReviews || 0})
                            </span>
                          </div>

                          <div className="mt-3 flex min-h-[28px] items-center gap-2">
                            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                              EGP {currentPrice.toLocaleString()}
                            </span>
                            {hasValidDiscount && (
                              <span className="text-sm text-gray-400 dark:text-slate-500 line-through">
                                EGP {price.toLocaleString()}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            disabled={!inStock || isAdding}
                            onClick={(e) => handleAddToCart(e,product._id)}
                            className={`mt-auto flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition ${
                              !inStock
                              ? "cursor-not-allowed bg-gray-400"
                              : isAdding
                              ? "cursor-not-allowed bg-indigo-400"
                              : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                          >
                            <i
                              className={
                                isAdding
                                ? "fa-solid fa-spinner fa-spin"
                                : !inStock
                                ? "fa-solid fa-ban"
                                : "fa-solid fa-cart-shopping"
                              }
                            ></i>

                            {!inStock
                              ? "Out of Stock"
                              : isAdding
                              ? "Adding..."
                              : "Add to Cart"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Pagination 
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  paginationLoading={paginationLoading}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Shop;