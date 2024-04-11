'use client'
import React from 'react'
import User_header from '@/components/User_header'
import UserProfile from '@/components/UserProfile'
import CommonFooter from '@/components/Common_Footer'
export default function User() {
    return (
        <div className='bg-white h-screen'>
            <User_header/>
             <UserProfile/>
            <div className='fixed bottom-0 w-full'>
            <CommonFooter/>
            </div>
            
           
        </div>
    )
}
