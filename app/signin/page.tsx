import React from "react";
import Button from "../components/Button";

const signup = () => {

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex flex-col items-center justify-center gap-10 border-2 border-slate-900 p-8 rounded-lg">
        <h2 className="text-4xl font-light">Sign In here!!</h2>
        <div>
          <input type="text" className="bg-slate-900 px-6 py-2 rounded-full text-white text-center" placeholder="username"/>
        </div>
        <div>
          <input type="password" className="bg-slate-900 px-6 py-2 rounded-full text-white text-center" placeholder="password"/>
        </div>
        <Button variant="light" title="Sign In" path="/content"/>
      </div>
    </div>
  );
};

export default signup;
