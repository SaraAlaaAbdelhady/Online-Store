import { createContext, useContext, useState, useEffect } from "react";
import { wishlistService } from "../services/api";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch my wishlist
  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const res = await wishlistService.getMyWishlist();

      setWishlist(res.wishlist?.products || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Add to wishlist
    // Add to wishlist
  const addToWishlist = async (productId) => {
    try {
      const res = await wishlistService.addToWishlist(productId);

      await fetchWishlist();

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const res = await wishlistService.removeFromWishlist(productId);

      // Remove the product from local state
      // so the heart stays empty after removing.
      setWishlist((currentWishlist) =>
        currentWishlist.filter((item) => item._id !== productId)
      );

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Clear wishlist
  const clearWishlist = async () => {
    try {
      const res = await wishlistService.clearWishlist();

      setWishlist([]);

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }

  return context;
};