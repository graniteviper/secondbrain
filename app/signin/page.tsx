"use client";
import React, { useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

const Signin = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function submit() {
    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/auth/signin", {
        username: username,
        password: password,
      });

      console.log(response);

      if (response.data.status === 200) {
        toast.success("Sign in successful!");
        setTimeout(() => {
          router.push("http://localhost:3000/content");
        }, 1500);
      } else {
        toast.error("Sign in failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500">
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <div className="flex flex-col items-center justify-center gap-6 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-semibold text-gray-800">Sign In Here!</h2>
        <div className="w-full">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Username"
          />
        </div>
        <div className="w-full">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Password"
          />
        </div>
        <Button
          variant="light"
          size="sm"
          onClick={submit}
          disabled={isLoading}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all disabled:bg-blue-300"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signin;
