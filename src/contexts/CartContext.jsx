import { createContext, useContext, useState, useEffect } from "react";
import { cartService } from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  //   ////////////////////////////////////////     fetch my cart      ///////////////////////////////////////////
  useEffect(() => {
    async function fetchCart() {
      try {
        const data = await cartService.getMyCart();
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, []);

  //   ////////////////////////////////////////     add item to cart      ///////////////////////////////////////////

  const addItemToCart = async (productId, quantity) => {
    try {
      const res = await cartService.addItemToCart(productId, quantity);
      const data = await cartService.getMyCart();
      setCart(data);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //   ////////////////////////////////////////     update item quantity      ///////////////////////////////////////////

  const updateItemQuantity = async (productId, quantity) => {
    try {
      const res = await cartService.updateItemQuantity(productId, quantity);
      const data = await cartService.getMyCart();
      setCart(data);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //   ////////////////////////////////////////     remove item from cart      ///////////////////////////////////////////

  const removeItemFromCart = async (productId) => {
    try {
      const res = await cartService.removeItemFromCart(productId);
      const data = await cartService.getMyCart();
      setCart(data);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //   ////////////////////////////////////////     apply coupon      ///////////////////////////////////////////

  const applyCoupon = async (code) => {
    try {
      const res = await cartService.applyCoupon(code);
      const data = await cartService.getMyCart();
      setCart(data);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //   ////////////////////////////////////////     remove coupon      ///////////////////////////////////////////

  const removeCoupon = async () => {
    try {
      const res = await cartService.removeCoupon();
      const data = await cartService.getMyCart();
      setCart(data);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //   ////////////////////////////////////////     clear cart      ///////////////////////////////////////////

  const clearCart = async () => {
    try {
      const res = await cartService.clearCart();
      const data = await cartService.getMyCart();
      setCart(data);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //   ///////////////////////////////////////           provider                    /////////////////////////////////////////////
  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        applyCoupon,
        removeCoupon,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// /////////////////////////////////             custom hook           ///////////////////////////////////////////////////////////
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
