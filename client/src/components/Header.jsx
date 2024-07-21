import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
    const { currentuser } = useSelector(state => state.user)
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <sapn>TO.</sapn>
                        <sapn className='text-green-700'>Estate</sapn>
                    </h1>
                </Link>
                <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' /><FaSearch className='hover:cursor-pointer hover:text-green-700' />
                </form>

                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='hidden sm:inline text-slate-700  hover:text-green-700 hover:cursor-pointer'>Home</li>
                    </Link>
                    <Link to='/About'>
                        <li className='hidden sm:inline text-slate-700  hover:text-green-700 hover:cursor-pointer'>About</li>
                    </Link>
                    <Link to='/profile'>
                        {currentuser ?
                            (
                                <img src={currentuser.imageUrl} alt='profile' className='rounded-full h-7 w-7 object-cover' />
                            ) : (
                                <li className='hidden sm:inline text-slate-700  hover:text-green-700 hover:cursor-pointer'>Signin</li>
                            )
                        }
                    </Link>
                </ul>
            </div>
        </header >
    )
}
