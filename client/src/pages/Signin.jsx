import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, loginSuccess, loginFailed } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'

export default function Signin() {
  const [formData, setformData] = useState({})
  const { loading , errors } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const Dispatch = useDispatch()
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      //setLoading(true)
      Dispatch(login());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success === false) {
        //setLoading(false)
        //setErrors(data.message)
        Dispatch(loginFailed(data.message));
        return;
      }
      //setLoading(false)
      //setErrors(null)
      Dispatch(loginSuccess(data));
      navigate('/')
      //console.log(data)
    } catch (error) {
      //setLoading(false)
      //setErrors(error.message)
      Dispatch(loginFailed(error.message));
    }

  }

  console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h2 className="text-3xl font-semibold text-center my-7">Sign In</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input onChange={handleChange} type='email' placeholder='e-mail'
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" id='email' />
        <input onChange={handleChange} type='password' placeholder='password'
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" id='password' />
        <button
          disabled={loading}
          type="submit"
          className='bg-green-700 text-white p-3 rounded-lg uppercase hover:bg-white hover:border-2 hover:border-green-700 hover:text-black disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth/>
        <p className="text-gray-600 text-sm">
          Don't have an account? <Link to="/signup" className="text-green-700 hover:text-green-800">Sign up</Link>
        </p>
      </form>
      {errors && <p className='text-red-600 mt-5'>{errors}</p>}
    </div>

  )
}
