import React from "react";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, className, type = "text", ...props }, ref) => {
    return (
      <div className="w-full mb-4">
        {label && (
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
            {label}
          </label>
        )}
        <div
          className={clsx(
            "relative flex items-center",
            error ? "animate-shake" : ""
          )}
        >
          {Icon && (
            <span className="absolute left-3 text-gray-400 pointer-events-none">
              <Icon size={18} />
            </span>
          )}
          <input
            ref={ref}
            type={type}
            className={clsx(
              "w-full py-2 px-3 pl-10 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-light bg-white dark:bg-dark text-gray-900 dark:text-white transition-all duration-200 outline-none shadow-soft",
              error && "border-danger focus:border-danger focus:ring-danger/30",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${label}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <span
            id={label ? `${label}-error` : undefined}
            className="text-danger text-xs mt-1 block"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
