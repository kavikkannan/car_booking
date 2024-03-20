'use client';
import Link from 'next/link'
import React from 'react'
import { useState,useEffect } from 'react'
import { div, motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline' 
import { Dialog } from '@headlessui/react'
import Lottie from 'lottie-react'
import { useRouter } from 'next/navigation'
import { auth, provider } from '@/firebaseConfig'
import { signInWithPopup } from 'firebase/auth'
import Loading from './Loading'
import { ref, set, get, child } from 'firebase/database';
import { db } from '@/firebaseConfig';
const navigation = [
    { name: 'Features', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Help?', href: '#' },
    
  ]
  
const Commonheader = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
      // Check if the user is already logged in
      auth.onAuthStateChanged((user) => {
          if (user) {
              setIsLoggedIn(true);
          } else {
              setIsLoggedIn(false);
          }
      });
  }, []);
    const handleSignIn = () => {
      setLoading(true);
      signInWithPopup(auth, provider)
        .then(async (data) => {
          const signedInEmail = data.user.email;
          const signedInName = data.user.displayName; // Fallback to email if display name is not available
          
          sessionStorage.setItem('email', signedInEmail);
          sessionStorage.setItem('emailstatus', true);
    
          // Check if user details exist in the database
          const userDetailsRef = ref(db, `newuser/userdetail/${signedInName}`);
          const userDetailsSnapshot = await get(userDetailsRef);
          if (!userDetailsSnapshot.exists()) {
            // If user details don't exist, create a new user object in the database
            await set(userDetailsRef, {
              name: signedInName,
              regno: '',
              phonenumber: '',
              age: '',
              graduate: '',
              branch: '',
              yearofpassout: '',
            });
          }
    
          setIsLoggedIn(true);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error('Error signing in:', error.message);
        });
    };
    
    


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-hidden overscroll-x-none">
          <header className="bg-white">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
              <div className="flex lg:flex-1">
                <a href="/" className="-m-1.5 p-1.5">
                  <h1 className="text-black font-extrabold text-2xl">VP</h1>
                </a>
              </div>
              <div className="flex lg:hidden">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="hidden lg:flex lg:gap-x-12">
                {navigation.map((item) => (
                  <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                {isLoggedIn ? (
                  <Link href={'/User'} className="text-sm font-semibold leading-6 text-gray-900">User &rarr;</Link>
                ) : (
                  <button onClick={handleSignIn} className="text-sm font-semibold leading-6 text-gray-900">
                    Log in <span aria-hidden="true">&rarr;</span>
                  </button>
                )}
              </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
              <div className="fixed inset-0 z-50" />
              <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <a href="#" className="-m-1.5 p-1.5">
                    <h1 className="text-black font-extrabold text-2xl">VP</h1>
                  </a>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="py-6">
                      {isLoggedIn ? (
                        <Link href={"/User"} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900">
                          User
                        </Link>
                      ) : (
                        <button onClick={handleSignIn} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Log in
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>
          </header>
        </div>
      )}
    </>
  );
}

export default Commonheader
