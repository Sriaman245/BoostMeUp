import React from 'react'

const Footer = () => {
  const currentYear=new Date().getFullYear();
  return (
    <footer className='flex flex-col justify-center items-center w-full bottom-0 h-16 bg-black text-white'>
      Copyright &copy; {currentYear} BoostMeUp - All Rights Reserved 
    </footer>
  )
}

export default Footer
