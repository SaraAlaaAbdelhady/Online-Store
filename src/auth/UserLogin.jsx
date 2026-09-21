import { useState } from "react";
import { CiLock, CiMail } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import AuthHeader from "../components/Auth/AuthHeader";
import  { Toaster } from "react-hot-toast";
import { ToastMessage } from "../components/Auth/ToastMessage";

const UserLogin = () => {
  const { login } = useUser();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    emailError: "",
    passError: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  ////////////////// updating data from user /////////////////////////////////

  const handleData = (e) => {
    setFormData((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  ////////////////// submit data user entered /////////////////////////////////

  const submitData = async (e) => {
    e.preventDefault();

    ///////////////////// Check if the data entered or not and if not throw error /////

    if (formData.email.trim() == "") {
      setErrors((prev) => ({
        ...prev,
        emailError: "Email is required",
      }));
    }

    if (formData.password.trim() == "") {
      setErrors((prev) => ({
        ...prev,
        passError: "Password is required",
      }));
    }

    ///////////////////// send request to the api with the data ////////////////

    if (formData.email.trim() !== "" && formData.password.trim() !== "") {
      try {
        setIsLoading(true);
        const response = await login(formData);
        if (response) {

         ToastMessage("success","Logged in Successfully")

          setTimeout(() => {
            navigate("/");
          }, 500);
        }
      } catch (error) {
        setIsLoading(false);

        console.log(error);
        ToastMessage("error","Invalid email or password.")
      }
    }
  };

  ////////////////// header content section  ////////////////////////////////

  const headerContent = {
    title: "Koda Store",
    message: "Welcome back",
    instructions: "Sign in to your account",
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="    flex flex-col gap-y-5 justify-center items-center bg-gray-50 min-h-fit p-2.5 dark:bg-[#0f172a] ">
        {/* header section  */}

        <AuthHeader headerContent={headerContent} />

        {/* start login form section  */}

        <form
          className="flex flex-col  justify-between w-[35%] bg-white px-5 py-4 rounded-2xl border border-gray-200 mb-10 dark:bg-[#1d293d93] dark:border-[#454e65]"
          method="post"
          onSubmit={submitData}
        >
          {/* ////////// email section ////////////////// */}

          <div className="flex flex-col gap-1 email w-full  mt-2 mb-3">
            <label className=" text-gray-500 text-[.82rem] font-medium font-sans">
              Email
            </label>

            <div className="input-holder w-full relative">
              <input
                className={`w-full py-2 px-1 pl-11 font-sans rounded-xl border ${errors.emailError?"border-red-500": "border-gray-400"} outline-0 focus:border-transparent  focus:ring-2 focus:ring-[#5d10ec] transition `}
                placeholder="you@example.com"
                type="email"
                name="email"
                onChange={handleData}
              />
              <span className="icon text-xl absolute left-[4%] top-[35%]">
                <CiMail size={18} strokeWidth={1} className="text-gray-400" />
              </span>
            </div>

            {errors.emailError && (
              <span className="block text-red-500 mt-1 text-xs font-sans">
                {errors.emailError}
              </span>
            )}
          </div>

          {/* ////////// password section ////////////////// */}

          <div className="password w-full flex flex-col gap-1 mb-4">
            <label className="text-gray-500 text-[.82rem] font-medium font-sans">
              Password
            </label>
            <div className="input-holder text-gray-700 w-full relative">
              <input
                className={`w-full py-2 px-1 pl-11 rounded-xl border ${errors.passError?"border-red-500": "border-gray-400"} outline-0 focus:border-transparent  focus:ring-2 focus:ring-[#5d10ec] transition`}
                placeholder="••••••••"
                type="password"
                name="password"
                onChange={handleData}
              />
              <span className="icon text-xl absolute left-[4%] top-[30%]">
                <CiLock size={18} strokeWidth={1} className="text-gray-400" />
              </span>
            </div>

            {errors.emailError && (
              <span className="block text-red-500 mt-1 text-xs font-sans">
                {errors.passError}
              </span>
            )}
          </div>

          <div className="forget ml-auto">
            <Link
              className="font-sans text-[.94rem] block mb-2 text-blue-700 hover:text-blue-500"
              to="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>

          {/* ////////// sign in btn ////////////////// */}

          <input
            className="w-full text-white font-sans font-semibold p-2 rounded-xl bg-linear-to-tl from-[#5d10ec] to-[#2368e9] opacity-90 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_5px_5px_-3px_rgba(0,0,0,0.3)] transition-all duration-300 mb-3"
            type="submit"
            value={`${isLoading ? "Sign in..." : "Sign in"}`}
            disabled={isLoading}
          />

          <div className="flex items-center justify-center">
            <p className="font-sans text-md text-gray-600">
              Don't have an account?{" "}
              <Link
                className="font-medium text-[.88rem] tracking-wide text-blue-700 hover:text-blue-900"
                to=""
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserLogin;
