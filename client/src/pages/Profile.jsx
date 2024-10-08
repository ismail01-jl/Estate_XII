import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage';
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  SignOutUserFailure,
  SignOutUserSuccess,
  SignOutUserStart
} from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import { app } from '../firebase.js';
import { Link } from 'react-router-dom';


export default function Profile() {
  const fileRef = useRef(null);
  const { currentuser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [UpdateSuccess, setUpdateSuccess] = useState(false)
  const [ShowListingsError, setShowListingsError] = useState(false)
  const [userListings, setUserListings] = useState([]);
  const [showListings, setShowListings] = useState(false); // State to toggle listings visibility
  const Dispatch = useDispatch();

  //console.log(formData)

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentuser._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        Dispatch(updateUserFailure(data.message));
        return;
      }
      Dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      Dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async (e) => {
    try {
      Dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentuser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        Dispatch(deleteUserFailure(data.message));
        return;
      }
      Dispatch(deleteUserSuccess(data))

    } catch (error) {
      Dispatch(deleteUserFailure(error.message))
    }
  }
  const handleSignoutUser = async (e) => {
    try {
      Dispatch(SignOutUserStart());
      const res = await fetch('/api/auth/signout')
      const data = await res.json()
      if (data.success === false) {
        Dispatch(SignOutUserFailure(data.message))
        return;
      }
      Dispatch(SignOutUserSuccess(data))
    } catch (error) {
      Dispatch(SignOutUserFailure(error.message))
    }
  }

  const handleShowListings = async () => {
    setShowListings(!showListings); // Toggle the state
    if (!showListings) {
      try {
        const res = await fetch(`/api/user/listings/${currentuser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowListingsError(true);
          return;
        }
        setUserListings(data);
      } catch (error) {
        setShowListingsError(true);
      }
    }
  };
   
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h2 className="text-3xl font-semibold text-center my-7">Profile</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="file" ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
          hidden accept='image/*' />
        <img src={formData.avatar || currentuser.imageUrl} onClick={() => fileRef.current.click()} alt={'profile'}
          className='self-center mt-2 cursor-pointer rounded-full h-20 w-20 object-cover' id='imageUrl' />

        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>Error Image upload (image must be less than 2 mb)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700 '>Image successfully uploaded!</span>
          ) : ("")}
        </p>
        <input type="text" placeholder='username'
          defaultValue={currentuser.username} onChange={handleChange} id='usernamee' className='border p-3 rounded-lg' />
        <input type="email" placeholder='email' onChange={handleChange} id='email'
          defaultValue={currentuser.email} className='border p-3 rounded-lg' />
        <input type="password" placeholder='password' onChange={handleChange} id='password' className='border p-3 rounded-lg' />
        <button disabled={loading} className='bg-blue-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading ...' : 'Update'}
        </button>
        <Link to={'/create-listing'} className="bg-green-700 text-white rounded-lg p-3 text-center uppercase hover:opacity-95 disabled:opacity-80">
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignoutUser} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5 self-center'>{UpdateSuccess ? 'Success' : ''} </p>
      <button
        onClick={handleShowListings}
        className='text-blue-800 w-full font-semibold  hover:underline'>
        {showListings ? 'Hide Listings' : 'Show Listings'}
      </button>
      <p className='text-red-700 mt-5'>
        {ShowListingsError ? 'Error showing Listings ' : ''}
      </p>
      {showListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 shadow-custom flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain transition-transform duration-300 ease-in-out transform hover:scale-110'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold   truncate flex-1'
                to={`/view-listing/${listing._id}`}
              >
                <p className='hover:underline'>{listing.name}</p>
                <p className='font-light hover:underline'>{listing.regularPrice}$</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase'
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
                <Link to={`/edit-listing/${listing._id}`}>
                  <button className='text-blue-700 uppercase'>
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}