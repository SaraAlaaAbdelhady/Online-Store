import React from "react";
import { HiOutlineBolt } from "react-icons/hi2";
import { Link } from "react-router-dom";

const AuthHeader = ({headerContent}) => {
  
  return (
    <div className="header flex flex-col items-center justify-center gap-y-2">
      <Link
        to="/"
        className="text-indigo-500 text-[1.6rem] font-bold tracking-wide font-sans flex items-center gap-2"
      >
        <HiOutlineBolt className={`text-3xl ${headerContent.title == ""? "text-[2.6rem] mb-2" : "text-3xl"}`} strokeWidth={1.8} /> {headerContent.title}
      </Link>

      <div className="header-content text-center">
        <p className="text-[1.29rem] font-sans font-semibold">{headerContent.message}</p>
        <p className="text-gray-500 font-sans text-[.93rem]">
          {headerContent.instructions}
        </p>
      </div>
    </div>
  );
};

export default AuthHeader;
