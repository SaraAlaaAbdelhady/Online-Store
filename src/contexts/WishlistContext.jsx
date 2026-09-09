import { createContext, useContext, useState, useEffect } from "react";
import { wishlistService } from "../services/api";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  //   ////////////////////////////////////////     fetch my wishlist      ///////////////////////////////////////////
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

  //   ////////////////////////////////////////     add to wishlist      ///////////////////////////////////////////
  const addToWishlist = async (productId) => {
    try {
      const res = await wishlistService.addToWishlist(productId);
      setWishlist(res.wishlist?.products || []);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //   ////////////////////////////////////////     remove from wishlist      ///////////////////////////////////////////
  const removeFromWishlist = async (productId) => {
    try {
      const res = await wishlistService.removeFromWishlist(productId);
      const response = await wishlistService.getMyWishlist();
      setWishlist(response.wishlist?.products || []);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //   ////////////////////////////////////////     clear wishlist      ///////////////////////////////////////////
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
