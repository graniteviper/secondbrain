"use client";
import React from "react";
import Button from "../components/Button";
import { useState } from "react";

const signup = () => {

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex flex-col items-center justify-center gap-10 border-2 border-slate-900 p-8 rounded-lg">
        <h2 className="text-4xl font-light">Sign Up here!!</h2>
        <div>
          <input type="text" onChange={(e)=>{setusername(e.target.value)}} className="bg-slate-900 px-6 py-2 rounded-full text-white text-center" placeholder="username"/>
        </div>
        <div>
          <input type="password" onChange={(e)=>{setpassword(e.target.value)}} className="bg-slate-900 px-6 py-2 rounded-full text-white text-center" placeholder="password"/>
        </div>
        <Button variant="light" title="Sign Up" path="/content" url="http://localhost:3000/api/auth/signup" username={username} password={password}/>
      </div>
    </div>
  );
};

export default signup;
