import React from 'react'
import {Button} from './Button'

type propTypes = {
  title: string,
  desc: string
}

const Card = ({title,desc}: propTypes) => {
  return (
    <div className='max-h-[200px] w-2/3 md:w-auto overflow-y-auto bg-white border border-gray-200 shadow-md p-6 m-4 rounded-lg'>
        <h1 className='font-open text-2xl font-bold text-black mb-4'>{title}</h1>
        <p className='text-lg text-gray-700 mb-4'>{desc}</p>
        <div className='flex gap-5'>
          <Button variant="blue" size="sm">
            Edit
          </Button>
          <Button variant="delete" size="sm">
            Del
          </Button>
        </div>
    </div>
  )
}

export default Card
