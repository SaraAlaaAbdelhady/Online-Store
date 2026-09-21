import { createContext, useContext, useState, useEffect } from "react";
import { productService } from "../services/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await productService.getAllProductsForFeatured();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // get  product by id
  const getProductById = async (id) => {
    try {
      const prodect = await productService.getProductById(id);
      return prodect;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // search  product

  const searchProducts = async (filters) => {
    try {
      const data = await productService.searchProducts(filters);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // get product reviews

  const getProductReviews = async (id) => {
    try {
      const res = await productService.getProductReviews(id);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // add a review

  const addReview = async (id, reviewData) => {
    try {
      const res = await productService.addReview(id, reviewData);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // delete a review

  const deleteReview = async (id, reviewId) => {
    try {
      const res = await productService.deleteReview(id, reviewId);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // provider
  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        getProductById,
        searchProducts,
        getProductReviews,
        addReview,
        deleteReview,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// custom hook
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
