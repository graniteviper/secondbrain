"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { Slot } from "@radix-ui/react-slot";
import {
  ArrowRight,
  Loader2
} from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500 shadow-sm",
        dark: "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:border-gray-600 focus-visible:ring-gray-500",
        light: "border-2 border-gray-200 bg-white text-gray-800 hover:bg-gray-100 focus-visible:ring-gray-300",
        delete: "border border-red-800 bg-red-900/60 text-gray-200 hover:bg-red-800 hover:text-white focus-visible:ring-red-500",
        blue: "bg-indigo-600 text-white hover:bg-indigo-700 border-none focus-visible:ring-indigo-500 shadow-sm",
        outline: "border border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 focus-visible:ring-gray-600",
        secondary: "bg-gray-700 text-gray-200 hover:bg-gray-600 focus-visible:ring-gray-500",
        ghost: "text-gray-300 hover:bg-gray-800 hover:text-gray-100 focus-visible:ring-gray-600",
        link: "text-indigo-400 underline-offset-4 hover:underline hover:text-indigo-300 focus-visible:ring-indigo-500",
        success: "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 py-1 text-xs",
        lg: "h-11 rounded-md px-7 py-2.5 text-base",
        icon: "h-10 w-10 p-2",
      },
      withIcon: {
        true: "gap-2",
        false: "",
      },
    },
    compoundVariants: [
      {
        withIcon: true,
        size: "sm",
        class: "gap-1.5",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      withIcon: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    withIcon,
    asChild = false,
    isLoading = false,
    rightIcon,
    leftIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, withIcon, className }))}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex">{rightIcon}</span>}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };