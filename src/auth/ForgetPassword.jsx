import React, { useState } from "react";
import AuthHeader from "../components/Auth/AuthHeader";
import { CiMail } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { Check } from "lucide-react";
import { ToastMessage } from "../components/Auth/ToastMessage";
import './Auth.css'

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const { sendForgotPasswordOtp } = useUser();
  const [email, setEmail] = useState({
    email: "",
  });

  // submit email to check if it exist or not and wait for OTP

  const submitEmail = async (e) => {
    e.preventDefault();
    // Check if the use enter the email or not

    if (email.email.trim() == "") {
      ToastMessage("error","Please Enter Your Email");
    } else {
      try {
        setIsLoading(true);
        const res = await sendForgotPasswordOtp(email);
        if (res) {
         ToastMessage("success", "OTP Sent To Your Email")
          setTimeout(() => {
            navigate(
              `/verify-otp?email=${encodeURIComponent(email.email)}&mode=reset`,
            );
          }, 500);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error.status);
        ToastMessage("error","User not found");
      }
    }
  };

  ////////////////// header content section  ////////////////////////////////

  const headerContent = {
    title: "",
    message: "Forgot Password?",
    instructions: "Enter your email and we'll send you a reset code",
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container flex flex-col gap-y-8 justify-center items-center bg-gray-50 min-h-fit p-5.5">
        {/* header section  */}

        <AuthHeader headerContent={headerContent} />

        {/* start login form section  */}

        <form
          className="flex flex-col gap-y-2 justify-between w-[35%] bg-white px-5 py-4 rounded-2xl border border-gray-200"
          method="post"
          onSubmit={submitEmail}
        >
          {/* ////////// email section ////////////////// */}

          <div className="flex flex-col gap-1 email w-full  mt-2 mb-3">
            <label className=" text-gray-500 text-[.82rem] font-medium font-sans">
              Email
            </label>

            <div className="input-holder text-gray-700 w-full relative">
              <input
                className="w-full py-2.5 px-2 pl-12 font-sans rounded-xl border border-gray-400 outline-0 focus:border-transparent  focus:ring-2 focus:ring-[#5d10ec] transition"
                placeholder="you@example.com"
                type="email"
                name="email"
                onChange={(e) => {
                  setEmail({ email: e.target.value });
                }}
              />
              <span className="icon text-xl absolute left-[4%] top-[35%]">
                <CiMail size={18} strokeWidth={1} className="text-gray-400" />
              </span>
            </div>
          </div>

          {/* ////////// sign in btn ////////////////// */}

          <input
            className="w-full text-white font-sans font-semibold p-2 rounded-xl bg-linear-to-tl from-[#5d10ec] to-[#2368e9] opacity-90 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_5px_5px_-3px_rgba(0,0,0,0.3)] transition-all duration-300 mb-3"
            type="submit"
            value={`${isLoading ? "Send Reset Code..." : "Send Reset Code"}`}
            disabled={isLoading}
          />

          <div className="flex items-center justify-center">
            <p className="font-sans text-md text-gray-600">
              Remember your password?{" "}
              <Link
                className="font-medium text-[.88rem] tracking-wide text-blue-700 hover:text-blue-900"
                to="/login"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
