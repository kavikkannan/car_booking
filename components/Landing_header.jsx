import Link from 'next/link'
import React from 'react'

const Landingheader = () => {
    const login = () => {
        console.log('highi')
    }

    return (
        <header className="relative  w-full bg-white text-blue-800 p-4 flex items-center justify-between">
            <div className="flex items-center">
                <img
                    src="/images/isa_logo.jpg"
                    alt="Logo"
                    className="h-8 w-8 mr-2"
                />
            </div>
            <div className="text-lg font-extrabold">
                International Society of Automation
            </div>
            <div>
                <Link
                    href="/login"
                    className="bg-white text-blue-500 px-4 py-2 rounded-md"
                >
                    Login
                </Link>
            </div>
        </header>
    )
}

export default Landingheader
