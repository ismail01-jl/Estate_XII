import React from 'react'

export default function CreateListing() {
    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold  text-center my-7'>Create Listing</h1>
            <form className='flex flex-col sm:flex-row gap-4'>
                <div className="flex flex-col gap-4 flex-1">
                    <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required />
                    <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required />
                    <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' required />
                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='sale' className='w-5' />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='Rent' className='w-5' />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='parking' className='w-5' />
                            <span>Parking spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='furnished' className='w-5' />
                            <span>furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='Offer' className='w-5' />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className="flex gap-6 flex-wrap">
                        <div className="flex items-center gap-2">
                            <input type="number" id='bedrooms' defaultValue="1" min='1' max='10' required className=' text-black p-3 border border-gray-300 rounded-lg' />
                            <p>Beds</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" id='bathrooms' defaultValue="1" min='1' max='10' required className=' text-black p-3 border border-gray-300 rounded-lg' />
                            <p>Baths</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" id='regular_price' defaultValue="0" min='1' max='10' required className=' text-black p-3 border border-gray-300 rounded-lg' />
                            <div className='flex flex-col items-center'>
                                <p>Regular Price</p>
                                <span className='text-xs'> ($/Month)</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" id='discounted_price' defaultValue="0" min='1' max='10' required className=' text-black p-3 border border-gray-300 rounded-lg' />
                            <div className='flex flex-col items-center'>
                                <p>Discounted Price</p>
                                <span className='text-xs'> ($/Month)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-4">
                    <p className='font-semibold'>Images:
                        <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                    </p>
                    <div className="flex flex-row gap-4">
                        <input className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image' multiple />
                        <button className='p-3 text-green-600 border border-green-700 rounded '> Upload</button>
                    </div>
                    <button className='uppercase border border-blue-700 bg-blue-700 rounded text-white hover:bg-blue-600  p-3'>Create Listing </button>
                </div>
            </form>
        </main>
    )
}