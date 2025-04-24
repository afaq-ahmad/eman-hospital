import React from "react";
import clsx from "clsx";   // tiny helper, see package.json below

export default function Button({
  variant = "default",
  size = "md",
  asChild = false,
  className = "",
  ...props
}) {
  const Comp = asChild ? "span" : "button";

  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50";

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variants = {
    default: "bg-primary text-white hover:bg-primary/90",
    outline: "border border-primary text-primary hover:bg-primary/5",
  };

  return (
    <Comp
      className={clsx(base, sizes[size], variants[variant], className)}
      {...props}
    />
  );
}
