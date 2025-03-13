"use client";
import { Button } from "./components/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      "#landing-hi",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
    tl.fromTo(
      "#landing-text",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.5"
    );
    tl.fromTo(
      ".anibutton",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.2 }
    );
  });

  function signup() {
    router.push("/signup");
  }
  function signin() {
    router.push("/signin");
  }

  return (
    <div className="h-screen w-screen relative bg-black text-white overflow-hidden">
      <img
        src="/bg-stars.jpeg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="relative flex flex-col items-center justify-center h-full text-center px-6 gap-10 font-sans">
        <h2 id="landing-hi" className="text-3xl font-light text-gray-300">
          Hello,
        </h2>
        <h1
          id="landing-text"
          className="text-5xl font-semibold leading-snug max-w-3xl"
        >
          Welcome to Your Second Brain
        </h1>
        <p className="text-lg text-gray-400 max-w-xl">
          Organize your thoughts, capture ideas, and enhance productivity in one
          seamless experience.
        </p>
        <div className="flex gap-6">
          <Button
            variant="dark"
            size="lg"
            onClick={signup}
            className="anibutton"
          >
            Sign Up
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={signin}
            className="anibutton border-gray-400 text-gray-300"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
