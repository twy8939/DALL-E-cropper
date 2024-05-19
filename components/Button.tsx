import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  disabled = false,
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={disabled}
      onClick={onClick}
      className={`text-gray-900 bg-white border border-gray-300 disabled:bg-gray-300 focus:outline-none enabled:hover:bg-gray-100 
        focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 
        dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:enabled:hover:bg-gray-700 dark:enabled:hover:border-gray-600 
        dark:focus:ring-gray-700 ${props.className}`}
    >
      {children}
    </button>
  );
}
