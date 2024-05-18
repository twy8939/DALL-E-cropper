import React, { InputHTMLAttributes } from "react";

function Input({ ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`bg-transparent border border-gray-300 text-slate-50 rounded-lg min-w-0 px-5 py-2.5 ${props.className}`}
    />
  );
}

export default Input;
