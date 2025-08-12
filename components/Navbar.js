"use client"
import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
  const { data: session } = useSession()
  // if (session) {
  //   return <>
  //     Signed in as {session.user.email} <br />
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }
  const [showdropdown,setShowdropdown]=useState(false);
  return (
    <nav className='bg-slate-800 text-white flex justify-between items-center px-2 md:px-10 md:h-16'>
      <Link className='flex items-center gap-2' href={"/"}>
      <img width={44} src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjJ0NWc0MjNwOHBsYzM3Y2VjNW55ZG9tcXVta3YwZW04bndvd2tidyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JmUd8L6SMdTrriXSEc/giphy.gif" alt="" />
      <span className="logo font-bold">BoostMeUp</span>
      </Link>
      <div className='relative '> 
      {session && <>
          <button  onClick={() => setShowdropdown(!showdropdown)} onBlur={() => {
            // setTimeout(() => {
            //   setShowdropdown(false)
            // }, 100);
          }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="hidden md:inline-flex text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Account <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
          </button>
          <button onClick={() => setShowdropdown(!showdropdown)}><img width={44} className='inline-block md:hidden rounded-full mx-2' src="profile.jpg" alt="" /></button>

          <div id="dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute left-[15px] top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
              </li>
              <li>
                <Link onClick={() => signOut()} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
              </li>
            </ul>
          </div></>
        }
        {session && <button onClick={() => { signOut() }} type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Logout
        </button>}
        {!session && <Link href={"/login"}>
          <button onClick={() => { signIn("github") }} type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Login
          </button>
        </Link>}
      </div>
    </nav>
  )
}

export default Navbar
