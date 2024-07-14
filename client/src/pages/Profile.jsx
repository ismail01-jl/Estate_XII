import React from 'react'
import { useSelector } from 'react-redux'


export default function Profile() {
  const { currentuser } = useSelector(state => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h2 className="text-3xl font-semibold text-center my-7">Profile</h2>
      <form className='flex flex-col gap-4'>
        <img src={currentuser.imageUrl} alt={'profile'} className='self-center mt-2 cursor-pointer rounded-full h-20 w-20 object-cover' />
        <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg' />
        <input type="email" placeholder='email' id='email' className='border p-3 rounded-lg' />
        <input type="password" placeholder='password' id='password' className='border p-3 rounded-lg' />
        <button className='bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}