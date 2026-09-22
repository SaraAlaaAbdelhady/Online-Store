
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../contexts/ProductContext";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";

const StarIcon = ({ filled }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 20 20"
    fill={filled ? "#FBBF24" : "none"}
    stroke={filled ? "#FBBF24" : "#D1D5DB"}
    strokeWidth="1.5"
  >
    <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4 3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" />
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

  const { getProductById } = useProduct();
  const { addToCart } = useCart();

  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

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
      <div className="max-w-6xl mx-auto px-6 py-16 text-gray-500">
        Loading product...
      </div>
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

  const {
    _id,
    name,
    brand,
    category,
    images = [],
    price,
    originalPrice,
    inStock,
    rating = 0,
    reviewCount = 0,
    description,
  } = product;

  const productId = _id;

  /*
    Handle different possible image formats
  */
  const productImage =
    typeof images?.[0] === "string"
      ? images[0]
      : images?.[0]?.url ||
        images?.[0]?.secure_url ||
        images?.[0]?.src ||
        "/placeholder-product.png";

  /*
    Wishlist
  */
  const wishlisted = wishlist.some(
    (item) => item._id === productId
  );

  /*
    Discount
  */
  const discountPct =
    originalPrice && originalPrice > price
      ? Math.round(
          ((originalPrice - price) / originalPrice) * 100
        )
      : null;

  /*
    Quantity
  */
  const decreaseQty = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const increaseQty = () => {
    setQuantity((q) => q + 1);
  };

  /*
    Add to cart
  */
  const handleAddToCart = async () => {
    if (!inStock) return;

    try {
      await addToCart(product, quantity);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  /*
    Wishlist
  */
  const handleWishlistToggle = async () => {
    try {
      if (wishlisted) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* ================= IMAGE ================= */}
        <div className="bg-gray-50 rounded-lg flex items-center justify-center p-8 min-h-[450px]">

          <img
            src={productImage}
            alt={name}
            className="max-h-[420px] max-w-full object-contain"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-product.png";
            }}
          />

        </div>

        {/* ================= DETAILS ================= */}
        <div>

          {/* Brand + Category */}
          <div className="flex flex-wrap gap-2 mb-3">

            {brand && (
              <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                {brand}
              </span>
            )}

            {category && (
              <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {category}
              </span>
            )}

          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">

            <div className="flex">
              {[1, 2, 3, 4, 5].map((n) => (
                <StarIcon
                  key={n}
                  filled={n <= Math.round(Number(rating))}
                />
              ))}
            </div>

            <span className="text-sm text-gray-400">
              ({reviewCount})
            </span>

            {!inStock && (
              <span className="text-xs font-medium bg-red-50 text-red-500 px-2.5 py-1 rounded-full ml-2">
                Out of Stock
              </span>
            )}

          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">

            <span className="text-3xl font-bold text-indigo-600">
              EGP{" "}
              {typeof price === "number"
                ? price.toLocaleString()
                : price}
            </span>

            {discountPct && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  EGP {originalPrice.toLocaleString()}
                </span>

                <span className="text-xs font-semibold bg-red-50 text-red-500 px-2 py-0.5 rounded-full">
                  -{discountPct}%
                </span>
              </>
            )}

          </div>

          {/* Quantity + Cart + Wishlist */}
          <div className="flex items-center gap-4 mb-8">

            {/* Quantity */}
            <div className="flex items-center border border-gray-200 rounded-lg">

              <button
                onClick={decreaseQty}
                disabled={!inStock}
                className="w-10 h-11 text-gray-500 disabled:opacity-40"
              >
                −
              </button>

              <span className="w-10 text-center font-medium">
                {quantity}
              </span>

              <button
                onClick={increaseQty}
                disabled={!inStock}
                className="w-10 h-11 text-gray-500 disabled:opacity-40"
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
              className="w-11 h-11 flex items-center justify-center border border-gray-200 rounded-lg"
            >
              <HeartIcon filled={wishlisted} />
            </button>

          </div>

          {/* Description */}
          {description && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h2>

              <p className="text-gray-600 leading-relaxed">
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
