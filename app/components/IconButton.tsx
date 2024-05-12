import React from "react";

interface Props {
  title?: string;
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

export default function IconButton({
  title,
  children,
  onClick,
  active = false,
  disabled = false,
}: Props) {
  return (
    <button
      className={`w-[46px] h-[46px] flex items-center justify-center hover:bg-slate-300/10 rounded-full ${
        active ? "text-sky-300 bg-slate-300/10" : "text-slate-300"
      }`}
      title={title}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
