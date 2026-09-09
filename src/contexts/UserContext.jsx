import { createContext, useContext, useState } from "react";
import { authService } from "../services/api";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // ///////////////////////////////////////            send registration OTP                    /////////////////////////////////////////////
  const sendRegisterOtp = async (userData) => {
    try {
      const res = await authService.sendRegisterOtp(userData);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // ///////////////////////////////////////            verify registration OTP                    /////////////////////////////////////////////
  const verifyRegisterOtp = async (email, otp) => {
    try {
      const res = await authService.verifyRegisterOtp(email, otp);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ////////////////////////////////////////////           User login             /////////////////////////////////////////////

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      setUser(data.user || data);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //   ///////////////////////////////////////            User logout                    /////////////////////////////////////////////

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem("token");
    setUser(null);
    // navigate('/login')
  };

  // ///////////////////////////////////////            send forgot password OTP                    /////////////////////////////////////////////
  const sendForgotPasswordOtp = async (email) => {
    try {
      const res = await authService.sendForgotPasswordOtp(email);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // ///////////////////////////////////////            verify OTP & reset password                    /////////////////////////////////////////////
  const resetPassword = async (email, otp, newPassword) => {
    try {
      const res = await authService.resetPassword(email, otp, newPassword);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //   ///////////////////////////////////////            get  user profile                    /////////////////////////////////////////////

  const getUserProfile = async () => {
    try {
      const res = await authService.getUserProfile();
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //   ////////////////////////////////////////     update user by id      ///////////////////////////////////////////
  const updateUserById = async (id, updatedData) => {
    try {
      const res = await authService.updateUserById(id, updatedData);

      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //   ///////////////////////////////////////           provider                    /////////////////////////////////////////////

  return (
    <UserContext.Provider
      value={{
        sendRegisterOtp,
        verifyRegisterOtp,
        user,
        login,
        logout,
        sendForgotPasswordOtp,
        resetPassword,
        updateUserById,
        getUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// /////////////////////////////////             custom hook           ///////////////////////////////////////////////////////////

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
