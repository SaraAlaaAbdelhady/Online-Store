import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Register = () => {
  const { sendRegisterOtp } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (!formData.username.trim()) {
      setError("Please enter your username.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!formData.password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      await sendRegisterOtp({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Save registration data temporarily
      // so the OTP page can resend the code if needed.
      sessionStorage.setItem(
        "registerData",
        JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
      );

      // Show success toast.
      setSuccess(true);

      // Give the toast time to appear,
      // then move to the OTP verification page.
      setTimeout(() => {
        navigate("/verify-otp", {
          state: {
            email: formData.email,
          },
        });
      }, 1500);
    } catch (error) {
      setError(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-80px)] bg-gray-50 px-4 py-12 transition-colors sm:px-6 lg:px-8 dark:bg-slate-950">

      {/* Success Toast */}
      {success && (
        <div className="fixed right-5 top-5 z-50 flex items-center gap-3 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg dark:bg-[#0f1629]">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
            <i className="fa-solid fa-check text-sm text-white"></i>
          </div>

          <span>OTP sent to your email.</span>
        </div>
      )}

      <div className="mx-auto flex max-w-md flex-col items-center">

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <i className="fa-solid fa-bolt text-xl text-indigo-600 dark:text-[#0ec4ec]"></i>

            <h1 className="text-xl font-bold text-indigo-600 dark:text-[#0ec4ec]">
              Koda Store
            </h1>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Create an account
          </h2>

          <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
            Join us and start shopping
          </p>
        </div>

        {/* Register Card */}
        <div className="w-full rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-colors sm:p-6 dark:border-gray-700 dark:bg-slate-900">
          <form onSubmit={handleSubmit}>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-slate-300"
              >
                Username
              </label>

              <div className="relative">
                <i className="fa-regular fa-user pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-slate-400"></i>

                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  disabled={loading}
                  className="h-10 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-slate-300 dark:placeholder:text-slate-500 dark:focus:border-[#2368e9] dark:focus:ring-[#2368e9] dark:disabled:bg-gray-800"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mt-4">
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-slate-300"
              >
                Email
              </label>

              <div className="relative">
                <i className="fa-regular fa-envelope pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-slate-400"></i>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  disabled={loading}
                  className="h-10 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-slate-300 dark:placeholder:text-slate-500 dark:focus:border-[#2368e9] dark:focus:ring-[#2368e9] dark:disabled:bg-gray-800"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-4">
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-slate-300"
              >
                Password
              </label>

              <div className="relative">
                <i className="fa-solid fa-lock pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-slate-400"></i>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  disabled={loading}
                  className="h-10 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-slate-300 dark:placeholder:text-slate-500 dark:focus:border-[#2368e9] dark:focus:ring-[#2368e9] dark:disabled:bg-gray-800"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600 dark:border-red-900 dark:bg-gray-800 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400 dark:bg-[#2368e9] dark:hover:bg-[#0ec4ec] dark:disabled:bg-gray-700"
            >
              {loading && (
                <i className="fa-solid fa-spinner fa-spin text-xs"></i>
              )}

              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-5 text-center text-xs text-gray-500 dark:text-slate-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 transition hover:text-indigo-700 hover:underline dark:text-[#0ec4ec] dark:hover:text-cyan-300"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Register;