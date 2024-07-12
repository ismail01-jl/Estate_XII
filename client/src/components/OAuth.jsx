import { GoogleAuthProvider, getAuth , signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { loginSuccess } from '../redux/user/userSlice';

export default function OAuth() {
    const Dispatch = useDispatch()
    const Navigate = useNavigate()
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            //console.log(result)
            const respond = await fetch('/api/auth/google',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                body: JSON.stringify({name:result.user.displayName , email: result.user.email , photo: result.user.photoURL }),
            })
            const data = await respond.json()
            Dispatch(loginSuccess(data));
            Navigate('/')
        } catch (error) {
            console.log("could not sign up with google", error)
        }
    }
    return (
        <button
            type="button"
            onClick={handleGoogleClick}
            className="bg-red-800 p-3 hover:bg-white hover:border-red-800 hover:border-2 hover:text-black text-white font-bold p rounded-md"
        >
            CONTINUE WITH GOOGLE
        </button>
    )
}
