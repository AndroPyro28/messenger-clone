import clsx from "clsx";
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
  children: React.ReactNode;
  secondary?: boolean;
  danger?: boolean;
  fullWidth?: boolean;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function Button({
  children,
  type,
  danger,
  secondary,
  onClick,
  fullWidth,
  ...rest
}: ButtonProps) {
  const className = { ...rest }.className;
  return (
    <button
      onClick={onClick}
      {...rest}
      className={clsx(`
      ${className}
  flex
  justify-center
  rounded-md
  px-3
  py-2
  text-sm
  font-semibold
  focus-visible:outline
  focus-visible:outline-2
  focus-visible:outline-offset-2
  disabled:opacity-50
  disabled:cursor-default
  ${fullWidth && "w-full"}
  ${secondary ? "text-gray-900" : "text-white"}
  ${danger && " bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600"}
  ${
    !danger &&
    !secondary &&
    "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
  }
  `)}
    >
      {children}
    </button>
  );
}

export default Button;
