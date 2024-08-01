import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';

export default function Header() {
    const { currentuser } = useSelector(state => state.user)
    const [searchTerm, setSearchTerm] = useState('');
    const Navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        Navigate(`/search?${searchQuery}`)
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <sapn>TO.</sapn>
                        <sapn className='text-green-700'>Estate</sapn>
                    </h1>
                </Link>
                <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input type='text'
                        placeholder='Search...'
                        className='bg-transparent focus:outline-none w-24 sm:w-64'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button>
                        <FaSearch className='hover:cursor-pointer hover:text-green-700' />
                    </button>

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
