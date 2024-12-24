"use client"
import Button from "./components/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {

  useGSAP(()=>{
    const tl = gsap.timeline();
    tl.fromTo("#landing-hi",{
        y: 100,
        opacity: 0
    },{
        y:0,
        opacity: 1,
        duration: 1,
        ease: "power1.inOut"
    });

    tl.fromTo("#landing-text",{
      y: 100,
      opacity: 0
  },{
      y:0,
      opacity: 1,
      duration: 1,
      ease: "power1.inOut"
  })

    tl.fromTo(".anibutton",{
      opacity:0,
    },{
      opacity:1,
      duration:0.5,
    })
  })

  return (
    <div className="h-screen w-screen relative">
      <img src="bg-stars.jpeg" alt="bg-image" className="h-full absolute w-full object-cover"/>
      <div className="relative text-white h-full w-full flex justify-center items-center flex-col gap-36 font-open">
        <h2 id = "landing-hi" className="text-4xl font-light">Hello,</h2>
        <h1 id="landing-text" className="text-5xl font-light text-center leading-normal tracking-wide">Welcome to your Second Brain</h1>
        <div className="flex gap-10">
        <Button path="/signup" title="Sign Up" variant="dark" className="anibutton"/>
        <Button path="/signin" title="Sign In" variant="dark" className="anibutton"/>
        </div>
      </div>
    </div>
  );
}
