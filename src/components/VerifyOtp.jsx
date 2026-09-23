import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const VerifyOtp = () => {
  const { verifyRegisterOtp, sendRegisterOtp } = useUser();

  const location = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(60);

  const inputRefs = useRef([]);

  const registerData = JSON.parse(
    sessionStorage.getItem("registerData") || "null"
  );

  const email = location.state?.email || registerData?.email;

  // Start countdown
  useEffect(() => {
    if (countdown <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setCountdown((currentTime) => currentTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Focus first input when page opens
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleOtpChange = (index, value) => {
    // Allow only one digit
    if (!/^\d*$/.test(value)) {
      return;
    }

    const digit = value.slice(-1);

    setOtp((currentOtp) => {
      const updatedOtp = [...currentOtp];
      updatedOtp[index] = digit;
      return updatedOtp;
    });

    setError("");
    setSuccess("");

    // Move to next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input when Backspace is pressed
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    // Move left
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Move right
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedValue = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedValue) {
      return;
    }

    const newOtp = ["", "", "", "", "", ""];

    pastedValue.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);
    setError("");
    setSuccess("");

    const nextIndex = Math.min(pastedValue.length, 5);

    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    if (!email) {
      setError(
        "Registration email was not found. Please start the registration again."
      );
      return;
    }

    try {
      setLoading(true);

      const res = await verifyRegisterOtp(email, otpValue);

      setSuccess(
        res?.message || "Account created successfully."
      );

      // Registration is completed.
      sessionStorage.removeItem("registerData");

      // Give the success message a moment to appear.
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      setError(
        error.message ||
          "Invalid or expired OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || resending) {
      return;
    }

    if (!registerData) {
      setError(
        "Registration data was not found. Please start the registration again."
      );
      return;
    }

    setError("");
    setSuccess("");

    try {
      setResending(true);

      await sendRegisterOtp(registerData);

      setOtp(["", "", "", "", "", ""]);
      setCountdown(60);

      setSuccess("A new verification code has been sent.");

      inputRefs.current[0]?.focus();
    } catch (error) {
      setError(
        error.message ||
          "Could not resend the verification code. Please try again."
      );
    } finally {
      setResending(false);
    }
  };

  // If user opens /verify-otp directly without registering first
  if (!email) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="mx-auto flex max-w-md flex-col items-center">
          <div className="mb-6 text-center">
            <div className="mb-2 flex items-center justify-center">
              <i className="fa-solid fa-bolt text-xl text-indigo-600 dark:text-[#0ec4ec]"></i>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Verify Your Email
            </h2>

            <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">
              Please start the registration process first.
            </p>
          </div>

          <div className="w-full rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-700 dark:bg-slate-900">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="flex h-10 w-full items-center justify-center rounded-md bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700 dark:bg-[#2368e9] dark:hover:bg-[#0ec4ec]"
            >
              Back to Register
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto flex max-w-md flex-col items-center">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-2 flex items-center justify-center">
            <i className="fa-solid fa-bolt text-xl text-indigo-600 dark:text-[#0ec4ec]"></i>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Verify Your Email
          </h2>

          <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-gray-700 dark:text-slate-300">
              {email}
            </span>
          </p>
        </div>

        {/* OTP Card */}
        <div className="w-full rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-700 dark:bg-slate-900">
          <form onSubmit={handleVerify}>
            {/* OTP Inputs */}
            <div
              className="flex justify-center gap-2 sm:gap-3"
              onPaste={handlePaste}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleOtpChange(index, e.target.value)
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(index, e)
                  }
                  disabled={loading}
                  aria-label={`OTP digit ${index + 1}`}
                  className="h-11 w-10 rounded-md border border-gray-300 bg-white text-center text-lg font-semibold text-gray-800 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-50 sm:h-12 sm:w-12 dark:border-gray-700 dark:bg-gray-800 dark:text-slate-300 dark:focus:border-[#2368e9] dark:focus:ring-[#2368e9] dark:disabled:bg-gray-800"
                />
              ))}
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-center text-xs text-red-600 dark:border-red-900 dark:bg-gray-800 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-center text-xs text-green-600 dark:border-green-900 dark:bg-gray-800 dark:text-green-400">
                {success}
              </div>
            )}

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading || resending}
              className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400 dark:bg-[#2368e9] dark:hover:bg-[#0ec4ec] dark:disabled:bg-gray-700"
            >
              {loading && (
                <i className="fa-solid fa-spinner fa-spin text-xs"></i>
              )}

              {loading
                ? "Verifying..."
                : "Verify & Create Account"}
            </button>
          </form>

          {/* Resend */}
          <div className="mt-5 text-center text-xs text-gray-500 dark:text-slate-400">
            <span>Didn't receive the code? </span>

            {countdown > 0 ? (
              <span className="font-medium text-gray-400 dark:text-slate-500">
                Resend in {countdown}s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="font-medium text-indigo-600 transition hover:text-indigo-700 hover:underline disabled:cursor-not-allowed disabled:text-indigo-400 dark:text-[#0ec4ec] dark:hover:text-cyan-300 dark:disabled:text-slate-500"
              >
                {resending ? "Sending..." : "Resend"}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerifyOtp;