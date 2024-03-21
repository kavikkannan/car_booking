import React, { useState, useEffect } from 'react';
import { auth } from '@/firebaseConfig';
import Loading from './Loading';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [address, setAddress] = useState('');
  const [bookings, setBookings] = useState([]);
  const router=useRouter();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handelsignout = () => {
  
    auth.signOut()
      .then(() => {
        router.push("/Booking");
      })
      .catch((error) => {
        console.error('Error signing out:', error.message);
      });
  };
  
  const handleAddBooking = () => {
    // Logic to add booking
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <p>Please sign in to view your profile.</p>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 pl-4 pr-4">
        <div className='text-black font-extrabold'>
           <Link href={"/Booking"}>
            go back
           </Link>
        </div>
        <div className="flex flex-col items-center">
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="User profile"
              className="w-24 h-24 rounded-full mr-4"
            />
          )}
          <br/>
          <h2 className="text-lg text-zinc-800 font-semibold">hii!! {user.displayName}</h2>
        </div>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
          onClick={handelsignout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
