import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h2 className="text-3xl font-semibold text-center my-7">Sign Up</h2>
      <form className='flex flex-col gap-4'>
        <input type='text' placeholder='username'
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" id='username' />
        <input type='email' placeholder='e-mail'
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" id='email' />
        <input type='password' placeholder='password'
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" id='password' />
        <button
          type="submit"
          className='bg-green-700 text-white p-3 rounded-lg uppercase hover:bg-white hover:border-2 hover:border-green-700 hover:text-black disabled:opacity-80'
        >
          SIGN UP
        </button>
        <button
          type="button"
          onClick={() => console.log('Continue with Google')}
          className="bg-red-800 p-3 hover:bg-white hover:border-red-800 hover:border-2 hover:text-black text-white font-bold p rounded-md"
        >
          CONTINUE WITH GOOGLE
        </button>
        <p className="text-gray-600 text-sm">
          Have an account? <Link to="/signin" className="text-green-700 hover:text-green-800">Sign in</Link>
        </p>
      </form>
    </div>

  )
}
