"use client";
import React from 'react'
import {Button} from './Button'

//@ts-ignore
const Navbar = ({setenterContent}) => {

  function takeData(){
    setenterContent(true)
  }

  return (
    <div className='flex items-center justify-between px-4'>
        <div className='cursor-pointer'>
            Logo
        </div>
        <div className='flex gap-4'>
          <Button variant="blue" size="sm"  onClick={takeData}>
            Add Data
          </Button>
          <Button variant="delete" size="sm" >
            Sign Out
          </Button>
        </div>
    </div>
  )
}

export default Navbar