import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../contexts/ProductContext";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const StarIcon = ({ filled }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill={filled ? "#FBBF24" : "none"}
    stroke={filled ? "#FBBF24" : "#D1D5DB"}
    strokeWidth="1.5"
  >
    <path d="M12 3.5l2.75 5.57 6.15.89-4.45 4.34 1.05 6.13L12 17.54l-5.5 2.89 1.05-6.13L3.1 9.96l6.15-.89L12 3.5z" />
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={filled ? "#6D5EF0" : "none"}
    stroke={filled ? "#6D5EF0" : "#374151"}
    strokeWidth="1.8"
  >
    <path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2 4.5 5.7 4c2.1-.3 4 .8 6.3 3.2C14.3 4.8 16.2 3.7 18.3 4c3.7.5 5.3 4.4 3.7 7.7C19.5 16.4 12 21 12 21z" />
  </svg>
);

const CartIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
  </svg>
);

function ViewProduct() {
   const { id } = useParams();
  const navigate = useNavigate();

  const { getProductById } = useProduct();
  const { addItemToCart } = useCart();

  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };
  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      setLoading(true);
      setError(null);

      try {
        const data = await getProductById(id);

        console.log("PRODUCT DATA:", data);

        if (!cancelled) {
          setProduct(data.product);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [id, getProductById]);

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-700 font-medium">
          We couldn't load this product.
        </p>

        {error && (
          <p className="text-sm text-gray-400 mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }

  // =========================
  // API PRODUCT DATA
  // =========================

const {
  _id,
  name,
  brand,
  category,
  images = [],
  price,
  discountPrice,
  stock,
  averageRating = 0,
  numReviews = 0,
  description,
} = product;

const inStock = Number(stock) > 0;



  // =========================
  // IMAGE
  // =========================

  const productImage =
    typeof images?.[selectedImage] === "string"
      ? images[selectedImage]
      : images?.[selectedImage]?.url ||
        images?.[selectedImage0]?.secure_url ||
        images?.[selectedImage]?.src ||
        "/placeholder-product.png";

  // =========================
  // WISHLIST
  // =========================

  const wishlisted = wishlist.some(
    (item) => item._id === _id
  );

  // =========================
  // PRICE / DISCOUNT
  // =========================

  const hasDiscount =
    Number(discountPrice) > 0 &&
    Number(discountPrice) < Number(price);

  const currentPrice = hasDiscount
    ? Number(discountPrice)
    : Number(price);

  const discountPct = hasDiscount
    ? Math.round(
        ((Number(price) - Number(discountPrice)) /
          Number(price)) *
          100
      )
    : 0;

  // =========================
  // QUANTITY
  // =========================

  const decreaseQty = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const increaseQty = () => {
    setQuantity((q) => {
      if (q >= Number(stock)) {
        return q;
      }

      return q + 1;
    });
  };

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = async () => {
    if (!inStock) return;

    try {
      await addItemToCart(_id, quantity);
      showToast("Added to cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      if (error?.message?.toLowerCase().includes("not authorized")) {
        showToast("Please sign in first");
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } else {
        showToast("Something went wrong");
      }
    }
  };

  // =========================
  // WISHLIST
  // =========================

   const handleWishlistToggle = async () => {
    try {
      if (wishlisted) {
        await removeFromWishlist(_id);
        showToast("Removed from wishlist");
      } else {
        await addToWishlist(_id);
        showToast("Added to wishlist");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      if (error?.message?.toLowerCase().includes("not authorized")) {
        showToast("Please sign in first");
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } else {
        showToast("Something went wrong");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-12 py-8 sm:px-6 lg:px-10">      

      {toast && (
        <div className="fixed right-6 top-6 z-50 flex w-fit max-w-[220px] items-center gap-2 rounded-xl bg-[#111827] px-3 py-2.5 shadow-xl dark:bg-slate-800">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500">
            <i className="fa-solid fa-check text-[10px] text-white"></i>
          </div>
          <span className="whitespace-nowrap text-xs font-medium text-white">
            {toast}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        <div>
          {/* Main Image */}
          <div className="relative bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center p-8 min-h-[450px]">
            <img
              src={productImage}
              alt={name}
              className="max-h-[420px] max-w-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "/placeholder-product.png";
              }}
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedImage((current) =>
                      current === 0 ? images.length - 1 : current - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white dark:bg-slate-700 shadow flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600"
                >
                  <IoMdArrowDropleft />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedImage((current) =>
                      current === images.length - 1 ? 0 : current + 1
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white dark:bg-slate-700 shadow flex items-center justify-center text-slate-600 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-600"
                >
                  <IoMdArrowDropright />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {images.map((image, index) => {
                const imageUrl =
                typeof image === "string"
                ? image
                : image?.url ||
                image?.secure_url ||
                image?.src ||
                "/placeholder-product.png";

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`w-28 h-28 shrink-0 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-indigo-500 dark:border-indigo-800"
                      : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={`${name} ${index + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* DETAILS */}

        <div>

          {/* Brand + Category */}

          <div className="flex flex-wrap gap-2 mb-3">

            {brand && (
              <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full dark:bg-indigo-900/30 dark:text-indigo-400">
                {brand}
              </span>
            )}

            {category && (
              <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full dark:bg-gray-700 dark:text-gray-200">
                {category}
              </span>
            )}

          </div>

          {/* Product Name */}

          <h1 className="text-3xl font-bold text-slate-900 mb-3 dark:text-slate-200">
            {name}
          </h1>

          {/* Rating + Stock */}

          <div className="flex items-center gap-2 mb-4">

            <div className="flex">
              {[1, 2, 3, 4, 5].map((n) => (
                <StarIcon
                  key={n}
                  filled={
                    n <= Math.round(Number(averageRating))
                  }
                />
              ))}
            </div>

            <span className="text-sm text-gray-400">
              ({numReviews})
            </span>

            {inStock ? (
              <span className="text-xs font-medium bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 px-2.5 py-1 rounded-full ml-2">
                In Stock
              </span>
            ) : (
              <span className="text-xs font-medium bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400 px-2.5 py-1 rounded-full ml-2">
                Out of Stock
              </span>
            )}

          </div>

          {/* Price */}

          <div className="flex items-baseline gap-3 mb-6">

            <span className="text-3xl font-bold text-indigo-600">
              EGP {currentPrice.toLocaleString()}
            </span>

            {hasDiscount && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  EGP {Number(price).toLocaleString()}
                </span>

                <span className="text-xs font-semibold bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400 px-2 py-0.5 rounded-full">
                  -{discountPct}%
                </span>
              </>
            )}

          </div>

          {/* Quantity + Cart + Wishlist */}

          <div className="flex items-center gap-4 mb-8">

            {/* Quantity */}

            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">

              <button
                onClick={decreaseQty}
                disabled={!inStock}
                className="w-10 h-11 text-gray-500 dark:text-gray-400 disabled:opacity-40"
              >
                −
              </button>

              <span className="w-10 text-center font-medium dark:text-slate-200">
                {quantity}
              </span>

              <button
                onClick={increaseQty}
                disabled={!inStock}
                className="w-10 h-11 text-gray-500 dark:text-gray-400 disabled:opacity-40"
              >
                +
              </button>

            </div>

            {/* Add To Cart */}

            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`flex-1 h-11 rounded-lg font-medium flex items-center justify-center gap-2 ${
                inStock
                  ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                  : "bg-indigo-200 text-white cursor-not-allowed"
              }`}
            >
              <CartIcon />

              {inStock ? "Add to Cart" : "Out of Stock"}
            </button>

            {/* Wishlist */}

            <button
              onClick={handleWishlistToggle}
              aria-label={
                wishlisted
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              className="w-11 h-11 flex items-center justify-center border border-gray-200 dark:border-gray-600 rounded-lg"
            >
              <HeartIcon filled={wishlisted} />
            </button>

          </div>

          {/* Available Stock */}

          {inStock && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {stock} items available
            </p>
          )}

          {/* Description */}

          {description && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-200 mb-2 ">
                Description
              </h2>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed ">
                {description}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
