'use client';
import React from 'react'
import AboutPage from '@/components/About'
import Lottie from 'lottie-react'
import under from '@/assests/under.json'
export default function selection() {
    return (
        
        <div className='flex flex-col bg-white w-full h-[100vh] justify-between'>
        <AboutPage/>  
        </div>
    )
}
