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
      const response = await axios.post("https://secondbrain-j1dm.vercel.app/api/auth/signin", {
        username: username,
        password: password,
      });

      console.log(response);

      if (response.data.status === 200) {
        toast.success("Sign in successful!");
        setTimeout(() => {
          router.push("https://secondbrain-j1dm.vercel.app/content");
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
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black">
      <Toaster 
        position="top-center" 
        toastOptions={{ 
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }} 
      />
      <div className="flex flex-col items-center justify-center gap-6 bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700 w-full max-w-md">
        <h2 className="text-3xl font-light text-white">Sign In</h2>
        <div className="w-full">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-white placeholder-gray-400"
            placeholder="Username"
          />
        </div>
        <div className="w-full">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none text-white placeholder-gray-400"
            placeholder="Password"
          />
        </div>
        <Button
          variant="light"
          size="sm"
          onClick={submit}
          disabled={isLoading}
          className="w-full bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-all disabled:bg-purple-800 disabled:opacity-50"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
        <p className="text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signin;