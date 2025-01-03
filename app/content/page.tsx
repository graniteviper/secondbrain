"use client";
import React from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";

const content = () => {

  const [enterContent, setenterContent] = useState(false)
  const [title, settitle] = useState("")
  const [desc, setdesc] = useState("")

  async function addCard(){
    const response = await axios.post('http://localhost:3000/api/content/add',{
      title:title,
      desc: desc
    })
    if(response){
      setenterContent(false);
    }
  }

  return (
    <div className="h-screen w-screen bg-white overflow-auto md:overflow-auto">
      <div className="mx-auto p-4">
        <Navbar setenterContent={setenterContent}/>
      </div>
      <div className="w-full mx-auto flex justify-center">
        {enterContent ? <div className="h-screen w-full flex justify-center items-center">
          <div className="w-1/2 h-1/2 border-black border-2 flex flex-col items-center justify-center gap-5">
            <input type="text" placeholder="title" className="px-4 py-1 text-center rounded-full border-gray-900 border-2" onChange={(e)=>{settitle(e.target.value)}}/>
            <input type="text" placeholder="description" className="px-4 py-1 text-center rounded-full border-gray-900 border-2" onChange={(e)=>{setdesc(e.target.value)}}/>
            <Button variant="light" size="lg" onClick={addCard}>
              Add
            </Button>
          </div>
        </div>  :  <div className="md:grid md:grid-cols-2 md:grid-row-2 md:w-2/3 flex flex-col items-center overflow-x-hidden">
          <Card
            title="Server and client components"
            desc="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
          />

        </div>}
      </div>
    </div>
  );
};

export default content;
