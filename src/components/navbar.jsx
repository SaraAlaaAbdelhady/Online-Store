import { useState } from "react";
import logo from "../assets/logo.png";
import { BiHeart, BiMoon, BiSearch, BiX } from "react-icons/bi";
import { MdOutlineLightMode } from "react-icons/md";
import { CgShoppingCart } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
    },
    {
      name: "Shop",
      href: "/shop",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
          <line x1="3" x2="21" y1="6" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      ),
    },
    {
      name: "My Orders",
      href: "/orders",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
          <path d="m3.3 7 8.7 5 8.7-5"></path>
          <line x1="12" x2="12" y1="22" y2="12"></line>
        </svg>
      ),
    },
    {
      name: "Wishlist",
      href: "/wishlist",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
        </svg>
      ),
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 min-w-0">
          <a
            className="flex h-11 w-auto min-w-11 items-center justify-center p-2 dark:bg-brand-900/20 sm:h-12 sm:min-w-12"
            href="/"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-8 w-auto object-contain sm:h-15"
            />
          </a>
        </div>
        <nav className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 p-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 md:flex">
          {navItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.name);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "text-white shadow-sm bg-[#4f46e5]"
                    : "text-slate-600 hover:bg-[#4f46e5] hover:text-white dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-1.5">
          {isSearchOpen ? (
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 px-4 py-1.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 transition-all">
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                className="w-40 bg-transparent text-sm text-slate-700 focus:outline-none dark:text-slate-200"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="rounded-full p-1 text-slate-500 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              >
                <BiX />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80  dark:border-slate-800 dark:bg-slate-900/80">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="rounded-full p-2 text-slate-600 transition-colors hover:bg-[#4f46e5] hover:text-white dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-400 outline-none "
              >
                <BiSearch size={20} />
              </button>
            </div>
          )}

          {/* the night and light mood button */}

          <button
            onClick={toggleTheme}
            className="rounded-full border border-slate-200 bg-slate-50/80 p-2 text-slate-600 transition-colors  hover:bg-[#4f46e5] hover:text-white dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-400"
          >
            {theme == "dark" ? <MdOutlineLightMode /> : <BiMoon size={20} />}
          </button>

          <button className="sm:flex rounded-full border border-slate-200 bg-slate-50/80 p-2 text-slate-600 transition-colors hover:bg-[#4f46e5] hover:text-white dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-400">
            <BiHeart size={20} />
          </button>

          <button className="rounded-full border border-slate-200 bg-slate-50/80 p-2 text-slate-600 transition-colors  hover:bg-[#4f46e5] hover:text-white dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-400">
            <Link to={"/cart"}>
              <CgShoppingCart size={20} />
            </Link>
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="block md:hidden rounded-full border border-slate-200 bg-slate-50/80 p-2 text-slate-600 shadow-sm transition-colors hover:bg-white hover:text-brand-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-400"
            type="button"
            aria-controls="drawer-navigation"
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <a
            href="/login"
            className="hidden md:inline-flex rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white  transition-all hover:bg-blue-600"
          >
            Login
          </a>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div
          className=" md:hidden fixed inset-0 z-35 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 sm:w-96 border-r border-slate-200 dark:bg-slate-950 dark:border-slate-800 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <div className="border-b border-slate-200 pb-4 mb-5 flex items-center justify-between dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200/80 p-1.5 shadow-sm dark:bg-slate-900 dark:border-slate-800">
              <img
                src={logo}
                alt="Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <div>
              <h5
                id="drawer-navigation-label"
                className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-0"
              >
                Koda Store
              </h5>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Welcome
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-controls="drawer-navigation"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-2.5 text-slate-600 shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <div className="overflow-y-auto">
          <div className="">
            <a
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#4f46e5] py-3.5 px-4 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:bg-[#4338ca]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Login to your account
            </a>
          </div>
          <hr className="border-t border-slate-200 dark:border-slate-800 my-4" />
          <ul className="space-y-2 font-medium">
            {navItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(item.name);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-base transition-all ${
                      isActive
                        ? "bg-[#4f46e5]/10 text-[#4f46e5] font-semibold dark:bg-indigo-950/50 dark:text-indigo-400"
                        : "text-slate-700 hover:bg-slate-100 hover:text-[#4f46e5] dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span
                      className={`${isActive ? "text-[#4f46e5] dark:text-indigo-400" : "text-slate-500 dark:text-slate-400"}`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
