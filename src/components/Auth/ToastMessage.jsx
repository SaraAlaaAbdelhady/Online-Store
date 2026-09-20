import React from "react";
import toast from "react-hot-toast";

export function ToastMessage(message) {
 return toast.error(message, {
    style: {
      background: "#111",
      color: "#fff",
      fontFamily: "sans-serif",
    },
   });
}
