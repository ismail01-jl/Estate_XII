import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function Contact({ listing }) {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandlord(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchLandlord();
    }, [listing.userRef]);

    const createMailtoLink = () => {
        const subject = `Regarding ${listing.name}`;
        const body = message;
        return `mailto:${landlord.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };
    return (
        <>
            {landlord && (
                <div className='flex flex-col gap-2'>
                    <p>
                        Contact <span className='font-semibold'>{landlord.username}</span>{' '}
                        for{' '}
                        <span className='font-semibold'>{listing.name.toLowerCase()}</span>
                    </p>
                    <textarea
                        name='message'
                        id='message'
                        rows='2'
                        value={message}
                        onChange={onChange}
                        placeholder='Enter your message here...'
                        className='w-full border p-3 rounded-lg'
                    >
                    </textarea>

                    <a
                        href={createMailtoLink()}
                        className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
                        onClick={(e) => {
                            if (!message) {
                                e.preventDefault();
                                alert('Please enter a message before sending.');
                            }
                        }}
                    >
                        Send Message
                    </a>
                </div>
            )}
        </>
    )
}
