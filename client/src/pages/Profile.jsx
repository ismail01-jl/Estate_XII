import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase.js'


export default function Profile() {
  const fileRef = useRef(null);
  const { currentuser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

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
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h2 className="text-3xl font-semibold text-center my-7">Profile</h2>
      <form className='flex flex-col gap-4'>
        <input type="file" ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
          hidden accept='image/*' />
        <img src={formData.avatar || currentuser.imageUrl} onClick={() => fileRef.current.click()} alt={'profile'} 
        className='self-center mt-2 cursor-pointer rounded-full h-20 w-20 object-cover' />

        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>Error Image upload (image must be less than 2 mb)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700 '>Image successfully uploaded!</span>
          ) : ("")}
        </p>
        <input type="text" placeholder='username' value={currentuser.username} id='username' className='border p-3 rounded-lg' />
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