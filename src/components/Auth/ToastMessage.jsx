import React from "react";
import toast from "react-hot-toast";

export function ToastMessage(type , message) {
  if(type == "error"){

    return toast.error(message, {
       style: {
         background: "#111",
         color: "#fff",
         fontFamily: "sans-serif",
       },
      });
    }else if (type == "success"){
    return toast.success(message, {
       style: {
         background: "#111",
         color: "#fff",
         fontFamily: "sans-serif",
       },
      });

  }
}
