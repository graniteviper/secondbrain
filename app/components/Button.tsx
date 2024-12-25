"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

type buttonProps = {
  variant: "light" | "dark";
  path?: string;
  title: string;
  className?: string;
  url?: string;
  username?: string;
  password?: string;
};

const variants = {
  dark: "border-gray-100 hover:text-black hover:bg-gray-100",
  light: "border-black hover:text-gray-100 hover:bg-black",
};

const Button = ({
  variant,
  path,
  title,
  className,
  url,
  username,
  password,
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
        } else {
        }
      }}
      className={`font-light px-4 py-1 rounded-lg border-2 transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;
