import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center text-white bg-purple-600'>
      <p className='text-xl font-bold'>Page Not Found</p>
      <Link to={'/'} className='underline underline-offset-2 font-semibold'>
        go to home
      </Link>
    </div>
  )
}

export default PageNotFound