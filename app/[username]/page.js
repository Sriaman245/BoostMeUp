import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from "next/navigation"
import connectDb from '@/db/connectDb'
import User from '@/models/User'
import { connect } from 'mongoose'
const Username = async ({ params }) => {
  
  // const checkUser=async ()=>{
  //   await connectDb()
  //   let u=await User.findOne({username: params.username})
  //   if(!u){
  //     return notFound()
  //   }
  // }
  // await checkUser()
  await connectDb();

  const user = await User.findOne({ username: params.username });

  if (!user) {
    return notFound(); // Return directly
  }

  return (
    <>
      <PaymentPage username={params.username} />
    </>
  )
}

export default Username

// export async function generateMetadata({params}){
//   return {
//     title:`Support ${params.username} - Boost Me Up`
//   }
// }
export async function generateMetadata({ params }) {
  if (!params || !params.username) {
    return {
      title: 'User Not Found - Boost Me Up',
    };
  }

  return {
    title: `Support ${params.username} - Boost Me Up`,
  };
}




// import React from 'react'
// import PaymentPage from '@/components/PaymentPage'
// import { notFound } from "next/navigation"
// import connectDb from '@/db/connectDb'
// import User from '@/models/User'
// const Username = async ({ params }) => {

//   // If the username is not present in the database, show a 404 page
//   const checkUser = async () => {
//     await connectDb()
//     let u = await User.findOne({ username: params.username })
//     if (!u) {
//       return notFound()
//     }
//   }
//   await checkUser()



//   return (
//     <>
//       <PaymentPage username={params.username} />
//     </>
//   )
// }

// export default Username
 
