import React, { useEffect, useRef, useState } from "react";
import AuthHeader from "../components/Auth/AuthHeader";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { Newspaper } from "lucide-react";
import { ToastMessage } from "../components/Auth/ToastMessage";

const VerifyOTP = () => {
  const { resetPassword, sendForgotPasswordOtp, verifyRegisterOtp } = useUser();

  /////////////////// get user data from URL  //////////////////

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const mode = searchParams.get("mode");

  //////////////////////// check is the user has email or not ///
  if (!email) {
    navigate("/login");
  }

  ///////////////////// start the states section //////////////////////////////

  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [otpData, setOtpData] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");

  ///////////////// handel resend OTP section //////////////////////////////////

  const [time, setTime] = useState(() => {
    const expiry = sessionStorage.getItem("otpExpiry");

    if (!expiry) return 0;

    return Math.max(0, Math.ceil((Number(expiry) - Date.now()) / 1000));
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const expiry = sessionStorage.getItem("otpExpiry");

      if (!expiry) {
        setTime(0);
        clearInterval(timer);
        return;
      }

      const remaining = Math.max(
        0,
        Math.ceil((Number(expiry) - Date.now()) / 1000),
      );

      setTime(remaining);

      if (remaining === 0) {
        clearInterval(timer);
        sessionStorage.removeItem("otpExpiry");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const handleResend = async (e) => {
    e.preventDefault();
    try {
      await sendForgotPasswordOtp(email);

      sessionStorage.setItem("otpExpiry", Date.now() + 60000);
      setTime(60);
    } catch (error) {
      console.log(error);
    }
  };

  ////////////// submit the new password with the OTP if the mode is reset old password //////////////////////

  const createNewPassword = async (e) => {
    e.preventDefault();

    ////////////////// Check if the otp and new password is Valid /////////////////////////////

    const OTP = otpData.join("");
    if (OTP.length < 6) {
      ToastMessage("error", "Please Enter Complete OTP");
    } else if (newPassword.trim() == "") {
      ToastMessage("error", "Please Enter New Password");
    } else if (newPassword.trim().length < 6) {
      ToastMessage("error", "Password must be at least 6 characters");
    }

    if (OTP.length == 6 && newPassword.trim().length >= 6) {
      try {
        setIsLoading(true);
        const res = await resetPassword(email, OTP, Newspaper);

        ToastMessage("success", "Password updated successfully");

        setTimeout(() => {
          navigate("/");
        }, 500);
      } catch (error) {
        setIsLoading(false);

        //////////// sent error message in case of error status 404  //////////////
        if (error?.message.includes("404")) {
          ToastMessage("error", "OTP not found");
        }
        //////////// sent error message in case of error status 400  //////////////
        else if (error?.message.includes("400")) {
          ToastMessage("error", "Invalid or expired OTP");
        } else {
          ToastMessage("error", "Server Error");
        }
      }
    }
  };

  const newEmailOtp = async (e) => {
    e.preventDefault();

    const OTP = otpData.join("");
    if (OTP.length < 6) {
      ToastMessage("error", "Please Enter Complete OTP");
    }

    if (OTP.length == 6) {
      try {
        setIsLoading(true);
        const res = await verifyRegisterOtp(email, OTP);

        ToastMessage("success", "Email Created Successfully");
        setTimeout(() => {
          navigate("/");
        }, 500);
      } catch (error) {
        setIsLoading(false);
        //////////// sent error message in case of error status 400  //////////////
        if (error?.message.includes("400")) {
          ToastMessage("error", "Invalid or expired OTP");
        } else {
          ToastMessage("error", "Server Error");
        }
      }
    }
  };

  ////////////////// header content section  ////////////////////////////////

  const headerContent = {
    title: "",
    message: "Verify Your Email",
    instructions: (
      <>
        We sent a 6-digit code to <span className="">{email}</span>
      </>
    ),
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container flex flex-col gap-y-8 justify-center items-center bg-gray-50 min-h-fit p-5">
        {/* header section  */}

        <AuthHeader headerContent={headerContent} />

        {/* start login form section  */}

        <form
          className="flex flex-col gap-y-2 justify-between w-[35%] bg-white px-5 py-4 rounded-2xl border border-gray-200"
          method="post"
          onSubmit={mode ? createNewPassword : newEmailOtp}
        >
          {/* ////////// OTP section ////////////////// */}
          <div className="flex gap-2 oto w-full my-2 justify-center">
            {otpData.map((value, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  className="w-12 py-3 text-2xl text-center font-sans font-bold rounded-lg border border-gray-400 outline-0 focus:border-transparent focus:ring-2 focus:ring-[#5d10ec] transition"
                  autoComplete="one-time-code"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  name=""
                  id=""
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otpData[index] && index > 0) {
                      inputRefs.current[index - 1]?.focus();
                    }
                  }}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (/^\d?$/.test(value)) {
                      setOtpData((prev) => {
                        const newOtp = [...prev];
                        newOtp[index] = value;
                        if (value && index < 5) {
                          inputRefs.current[index + 1]?.focus();
                        }
                        return newOtp;
                      });
                    } else {
                      e.target.value = "";
                    }
                  }}
                />
              );
            })}
          </div>

          {/* ////////// new password section ////////////////// */}

          {mode ? (
            <div className="flex flex-col gap-1 email w-full  mt-2 mb-3">
              <label className=" text-gray-500 text-[.82rem] font-medium font-sans">
                New Password
              </label>

              <div className="input-holder text-gray-700 w-full relative">
                <input
                  className="w-full py-2.5 px-2 pl-5 font-sans rounded-xl border border-gray-400 outline-0 focus:border-transparent focus:ring-2 focus:ring-[#5d10ec] transition"
                  placeholder="Enter new password"
                  type="password"
                  name="password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          ) : null}

          {/* ////////// sign in btn ////////////////// */}

          <input
            className="w-full text-white font-sans font-semibold p-2 rounded-xl bg-linear-to-tl from-[#5d10ec] to-[#2368e9] opacity-90 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_5px_5px_-3px_rgba(0,0,0,0.3)] transition-all duration-300 mb-3"
            type="submit"
            value={
              mode
                ? `${isLoading ? "Reset Password..." : "Reset Password"}`
                : `${isLoading ? "Verify & Create Account..." : "Verify & Create Account"}`
            }
            disabled={isLoading}
          />

          <div className="flex items-center justify-center">
            <p className="font-sans text-md text-gray-600">
              Didn't receive the code?{" "}
              {time !== 0 ? (
                `Resend in ${time}s`
              ) : (
                <button
                  className="font-medium text-[.88rem] tracking-wide text-blue-700 hover:text-blue-900"
                  onClick={handleResend}
                >
                  Resend
                </button>
              )}
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default VerifyOTP;
