import { createContext, useContext } from "react";
import { orderService } from "../services/api";

const OrderContext = createContext();

// ///////////////////////////////////////            place order                    /////////////////////////////////////////////

const placeOrder = async (orderData) => {
  try {
    const res = await orderService.placeOrder(orderData);
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ///////////////////////////////////////            get my orders                    /////////////////////////////////////////////

const getMyOrders = async (page, limit, status) => {
  try {
    const res = await orderService.getMyOrders(page, limit, status);
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};
// ///////////////////////////////////////            get my order by id                    /////////////////////////////////////////////

const getMyOrderById = async (id) => {
  try {
    const res = await orderService.getMyOrderById(id);
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ///////////////////////////////////////            cancel my order                    /////////////////////////////////////////////

const cancelMyOrder = async (id) => {
  try {
    const res = await orderService.cancelMyOrder(id);
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const OrderProvider = ({ children }) => {
  return (
    <OrderContext.Provider
      value={{ placeOrder, getMyOrders, getMyOrderById, cancelMyOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
