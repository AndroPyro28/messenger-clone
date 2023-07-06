"use client";
import clsx from "clsx";
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactElement,
} from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type InputProps = {
  label: string;
  required?: boolean;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

function Input({
  label,
  required,
  disabled,
  register,
  errors,
  ...rest
}: InputProps): ReactElement {
    const id = {...rest}?.id as string;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          disabled={disabled}
          {...rest}
          {...register(id as string, { required })}
           className={clsx(`
           form-input
            block
            w-full
            rounded-md
            border-0
            py-1.5
            px-2.5
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-inset
            focus:ring-sky-600
            sm:text-sm
            sm:leading-6
            `,
           errors[id] && `focus:ring-rose-500`,
           disabled && `opacity-50 cursor-default`
           )}
        />
      </div>
    </div>
  );
}

export default Input;
