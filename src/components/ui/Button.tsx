import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  type?: "button" | "submit";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  icon,
  fullWidth = false,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-xl";

  const variants = {
    primary: "bg-cyan-600 hover:bg-cyan-700 text-white focus:ring-cyan-400",
    secondary:
      "bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border border-cyan-100 focus:ring-cyan-300",
    outline:
      "bg-white/80 text-cyan-900 hover:text-cyan-600 border border-white/60 backdrop-blur-md focus:ring-cyan-300",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const width = fullWidth ? "w-full" : "";

  const buttonContent = (
    <>
      {icon}
      {children}
    </>
  );

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`;

  if (href) {
    return (
      <Link to={href} className={buttonClasses}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={buttonClasses}
      onClick={() => {
        console.log("Button clicked");
        onClick && onClick();
      }}
      type={type}
    >
      {buttonContent}
    </motion.button>
  );
}

export { Button };
