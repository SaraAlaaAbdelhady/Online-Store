import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/api";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // لإظهار حالة التحميل إن أردت
  const navigate = useNavigate();

  // جلب بيانات المستخدم تلقائياً عند تحميل التطبيق إذا كان هناك توكن مخزن
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token"); // تأكد من اسم المفتاح حسب ما تخزنه عند اللوجن
      if (token) {
        try {
          const res = await authService.getUserProfile();
          setUser(res.user || res); // ضبط بيانات المستخدم بناءً على شكل استجابة الـ API
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  // ///////////////////////////////////////           send registration OTP                    /////////////////////////////////////////////
  const sendRegisterOtp = async (userData) => {
    try {
      const res = await authService.sendRegisterOtp(userData);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // ///////////////////////////////////////           verify registration OTP                    /////////////////////////////////////////////
  const verifyRegisterOtp = async (email, otp) => {
    try {
      const res = await authService.verifyRegisterOtp(email, otp);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // ////////////////////////////////////////////          User login             /////////////////////////////////////////////
  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      // إذا كان الـ API يخزن الـ Token تلقائياً أو تحتاج لتخزينه:
      // if (data.token) localStorage.setItem("token", data.token);
      
      setUser(data.user || data);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //  ///////////////////////////////////////            User logout                    /////////////////////////////////////////////
  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem("token");
    setUser(null);
  };

  // ///////////////////////////////////////           send forgot password OTP                    /////////////////////////////////////////////
  const sendForgotPasswordOtp = async (email) => {
    try {
      const res = await authService.sendForgotPasswordOtp(email);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // ///////////////////////////////////////           verify OTP & reset password                    /////////////////////////////////////////////
  const resetPassword = async (email, otp, newPassword) => {
    try {
      const res = await authService.resetPassword(email, otp, newPassword);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //  ///////////////////////////////////////            get  user profile                    /////////////////////////////////////////////
  const getUserProfile = async () => {
    try {
      const res = await authService.getUserProfile();
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //  ////////////////////////////////////////    update user by id   ///////////////////////////////////////////
  const updateUserById = async (id, updatedData) => {
    try {
      const res = await authService.updateUserById(id, updatedData);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        sendRegisterOtp,
        verifyRegisterOtp,
        user,
        loading,
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

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};