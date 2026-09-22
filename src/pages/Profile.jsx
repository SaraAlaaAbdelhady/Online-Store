import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { BiMap, BiLock, BiLogOut, BiPlus, BiCheck } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout, updateUserById, sendForgotPasswordOtp, resetPassword, getUserProfile } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (getUserProfile) {
      getUserProfile().catch((err) => console.log("Error fetching profile:", err.message));
    }
  }, []);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  const [editForm, setEditForm] = useState({
    username: user?.username || "",
    phone: user?.phone || "",
    avatar: user?.avatar || ""
  });

  const handleOpenEdit = () => {
    setEditForm({
      username: user?.username || "",
      phone: user?.phone || "",
      avatar: user?.avatar || ""
    });
    setIsEditingProfile(true);
  };

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [emailInput, setEmailInput] = useState(user?.email || "");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [addressForm, setAddressForm] = useState({
    country: "",
    city: "",
    street: "",
    building: "",
    postalCode: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSaveProfile = async () => {
    try {
      if (!user?._id) {
        throw new Error("User ID is missing");
      }
      await updateUserById(user._id, editForm);
      setIsEditingProfile(false);
      setSuccessMessage("Profile updated successfully!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message || "Failed to update profile");
      setSuccessMessage("");
    }
  };

  const handleAddAddress = () => {
    if (!addressForm.country || !addressForm.city || !addressForm.street) {
      setErrorMessage("Please fill country, city and street");
      setSuccessMessage("");
      return;
    }
    setErrorMessage("");
    setSuccessMessage("Address added successfully!");
    setAddressForm({ country: "", city: "", street: "", building: "", postalCode: "" });
  };

  const handlePasswordFlow = async () => {
    try {
      if (!otpSent) {
        if (!emailInput) {
          setErrorMessage("Please enter your email");
          return;
        }
        await sendForgotPasswordOtp(emailInput);
        setOtpSent(true);
        setSuccessMessage("OTP sent to your email");
        setErrorMessage("");
      } else {
        if (!otpCode || !newPassword) {
          setErrorMessage("Please enter OTP and new password");
          return;
        }
        await resetPassword(emailInput, otpCode, newPassword);
        setSuccessMessage("Password reset successfully!");
        setErrorMessage("");
        setIsChangingPassword(false);
        setOtpSent(false);
        setNewPassword("");
        setOtpCode("");
      }
    } catch (error) {
      setErrorMessage(error.message || "Operation failed");
      setSuccessMessage("");
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-600 dark:text-slate-400 mb-4">Loading profile or not authenticated...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-10 py-10 min-h-screen relative dark:bg-slate-950">
            {errorMessage && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2.5 text-sm dark:bg-slate-800 border border-slate-700">
          <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">✕</span>
          <span>{errorMessage}</span>
        </div>
      )}
      {successMessage && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2.5 text-sm dark:bg-slate-800 border border-slate-700">
          <span className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xs">
            <BiCheck size={14} />
          </span>
          <span>{successMessage}</span>
        </div>
      )}

      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
        My Profile
      </h1>

      <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800">
          
          {!isEditingProfile ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden border border-slate-300 dark:border-slate-700 flex-shrink-0">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-800 text-white flex items-center justify-center font-bold text-xl">
                      {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">
                    {user.username}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {user.email}
                  </p>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5 inline-block">
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-base">✉️</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-base">📞</span>
                  <span>{user.phone || "No phone added"}</span>
                </div>
              </div>

              <div>
                <button 
                  onClick={handleOpenEdit}
                  className="px-5 py-2 rounded-xl border border-indigo-200 text-indigo-600 hover:bg-indigo-50 text-sm font-medium transition-colors dark:border-indigo-900 dark:text-indigo-400 dark:hover:bg-indigo-950/50"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden border border-slate-300 dark:border-slate-700 flex-shrink-0">
                  {editForm.avatar ? (
                    <img src={editForm.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-800 text-white flex items-center justify-center font-bold text-xl">
                      {editForm.username ? editForm.username.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">
                    {editForm.username}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {user.email}
                  </p>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5 inline-block">
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Username</label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Phone</label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Avatar URL</label>
                <input
                  type="text"
                  value={editForm.avatar}
                  onChange={(e) => setEditForm({...editForm, avatar: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950 truncate"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSaveProfile}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm shadow-indigo-500/20"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-4 text-slate-800 dark:text-white font-semibold">
            <BiMap className="text-indigo-600 text-xl" />
            <span>Addresses</span>
          </div>

          {(!user.addresses || user.addresses.length === 0) ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              No addresses yet.
            </p>
          ) : (
            <div className="space-y-3 mb-6">
              {user.addresses.map((addr, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300">
                  {addr.street}, {addr.city}, {addr.country}
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Country"
              value={addressForm.country}
              onChange={(e) => {
                setAddressForm({...addressForm, country: e.target.value});
                if(errorMessage) setErrorMessage("");
              }}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950"
            />
            <input
              type="text"
              placeholder="City"
              value={addressForm.city}
              onChange={(e) => {
                setAddressForm({...addressForm, city: e.target.value});
                if(errorMessage) setErrorMessage("");
              }}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950"
            />
            <input
              type="text"
              placeholder="Street"
              value={addressForm.street}
              onChange={(e) => {
                setAddressForm({...addressForm, street: e.target.value});
                if(errorMessage) setErrorMessage("");
              }}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950"
            />
            <input
              type="text"
              placeholder="Building"
              value={addressForm.building}
              onChange={(e) => setAddressForm({...addressForm, building: e.target.value})}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950"
            />
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Postal code"
              value={addressForm.postalCode}
              onChange={(e) => setAddressForm({...addressForm, postalCode: e.target.value})}
              className="w-full sm:w-1/2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950"
            />
          </div>

          <button 
            onClick={handleAddAddress}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm shadow-indigo-500/20"
          >
            <BiPlus size={18} />
            <span>Add Address</span>
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-3 text-slate-800 dark:text-white font-semibold">
            <BiLock className="text-indigo-600 text-xl" />
            <span>Change Password</span>
          </div>

          {!isChangingPassword ? (
            <button
              onClick={() => {
                setIsChangingPassword(true);
                setOtpSent(false);
                setEmailInput(user.email || "");
                setSuccessMessage("");
              }}
              className="px-4 py-2 rounded-xl border border-indigo-200 text-indigo-600 hover:bg-indigo-50 text-sm font-medium transition-colors dark:border-indigo-900 dark:text-indigo-400 dark:hover:bg-indigo-950/50"
            >
              Change Password
            </button>
          ) : (
            <div className="space-y-4 mt-2">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                We'll send an OTP to your email to verify your identity.
              </p>

              <div className="space-y-3">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950"
                />

                {otpSent && (
                  <>
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="Enter OTP code"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950"
                    />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950"
                    />
                  </>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePasswordFlow}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm shadow-indigo-500/20"
                >
                  {otpSent ? "Reset Password" : "Send OTP"}
                </button>
                <button
                  onClick={() => {
                    setIsChangingPassword(false);
                    setOtpSent(false);
                    setSuccessMessage("");
                  }}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          <button 
onClick={() => {
    logout();
    navigate("/login");
  }}            className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors shadow-sm shadow-red-500/20"
          >
            <BiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;
