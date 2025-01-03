"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  "px-5 py-2 transition-all duration-300 cursor-pointer",
  {
    variants: {
      variant: {
        dark: "border-gray-100 hover:text-black hover:bg-gray-100",
        light: "border-black hover:text-gray-100 hover:bg-black",
        delete: "border-red-600 hover:text-gray-100 hover:bg-red-600",
        blue: "border-blue-600 hover:text-gray-100 hover:bg-blue-600",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-lg px-8",
      },
    },
    defaultVariants: {
      variant: "light",
      size: "default",
    },
  }
);

export interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,VariantProps<typeof buttonVariants>{
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement,buttonProps>(({className,variant,size,asChild = false, ...props},ref)=>{
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})

export {Button, buttonVariants}

/*
const Button = ({
  variant,
  path,
  title,
  className,
  url,
  username,
  password,
  enterContent
}: buttonProps) => {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        if (url && path) {
          const response = await axios.post(url, {
            username: username,
            password: password,
          });
          console.log(response);
          if (response.data.status == 200) {
            router.push(path);
          }
        } else if (path) {
          router.push(path);
        } else if(enterContent){

        }
      }}
      className={`font-light px-4 py-1 rounded-lg border-2 transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;
*/
