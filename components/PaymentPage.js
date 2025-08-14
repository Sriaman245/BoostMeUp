"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchUser, fetchPayments, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';


const PaymentPage = ({ username }) => {
    // const { data: session } = useSession()

    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    useEffect(()=>{
        if(searchParams.get("paymentdone")=="true"){
            toast('Thanks for the donation', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
        }
        router.push(`/${username}`)
    },[])

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchUser(username)
        setcurrentUser(u)
        let dbpayments = await fetchPayments(username)
        setPayments(dbpayments)
        console.log(u, dbpayments)
    }


    const pay = async (amount) => {
        // Get the order Id 
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = new Razorpay(options);
        rzp1.open();
    }


    return (
        <>
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
/>

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover w-full  relative'>
                <img className='object-cover w-full h-[300]' src="https://c10.patreonusercontent.com/4/patreon-media…OewYUV9XEUA5-WZclJDhOr1c%3D&token-time=1756944000" alt="" />
                <div className=' absolute -bottom-17 border-2 rounded-full border-white md:right-[46%] right-[36%]'>
                    <img className=' rounded-full size-28 width={128} height={128}' src={currentUser.profilepic} alt="" />
                </div>
            </div>
            <div className='text-white flex flex-col justify-center items-center my-20'>
                <div className='font-bold text-lg' >
                    {username}
                </div>
                <div className='text-slate-400'>
                    Lets help {username} get a fund!
                </div>
                <div className='text-slate-400' >
                    {payments.length} Payments . ₹{payments.reduce((a,b)=>a+b.amount,0)} raised 
                </div>
                <div className='flex flex-col md:flex-row gap-3 w-[80%] mt-10' >
                    <div className='w-full md:w-1/2 bg-slate-800 rounded-lg text-white p-10 '>
                        <h2 className='text-2xl font-bold my-3 '>Top 10 Supporters</h2>
                        <ul className='mx-5'>
                            {payments.length==0 && <li> No Payments Yet </li> }
                            {payments.map((p, i) => {
                                return <li className='flex items-center gap-2 mb-4'> <img width={38} src="avatar.gif" alt="" /><span>{p.name} donated <span className='font-bold'>₹{p.amount}</span>  with a message {p.message}</span></li>
                            })}
                        </ul>
                    </div>
                    <div className='w-full md:w-1/2 bg-slate-800 rounded-lg text-white p-10'>
                        <h2 className='text-2xl font-bold mb-5'>Make a Payment</h2>
                        <div className='flex flex-col gap-2'>
                            <input type="text" onChange={handleChange} value={paymentform.name} name="name" className='w-full p-3 rounded-lg bg-slate-900' placeholder='Enter Name' />
                            <input type="text" onChange={handleChange} value={paymentform.message} name="message" className='w-full p-3 rounded-lg bg-slate-900' placeholder='Enter Message' />
                            <input type="text" onChange={handleChange} value={paymentform.amount} name="amount" className='w-full p-3 rounded-lg bg-slate-900' placeholder='Enter Amount' />
                            <button type="button" onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2 disabled:opacity-30  " disabled={paymentform.name?.length<3 || paymentform.message?.length<4 || paymentform.amount?.length<1}>Pay</button>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2 mt-5">
                            <button className='bg-slate-900 p-3 rounded-lg' onClick={() => pay(1000)}>Pay ₹10</button>{/*₹->ctrl+shift+$*/}
                            <button className='bg-slate-900 p-3 rounded-lg' onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className='bg-slate-900 p-3 rounded-lg' onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>

        </>
    )
}

export default PaymentPage





// "use client"
// import React, { useEffect, useState } from 'react'
// import Script from 'next/script'
// import { useSession } from 'next-auth/react'
// import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
// import { useSearchParams } from 'next/navigation'
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { Bounce } from 'react-toastify';
// import { useRouter } from 'next/navigation'
// import { notFound } from "next/navigation"

// const PaymentPage = ({ username }) => {
//     // const { data: session } = useSession()

//     const [paymentform, setPaymentform] = useState({name: "", message: "", amount: ""})
//     const [currentUser, setcurrentUser] = useState({})
//     const [payments, setPayments] = useState([])
//     const searchParams = useSearchParams()
//     const router = useRouter()

//     useEffect(() => {
//         getData()
//     }, [])

//     useEffect(() => {
//         if(searchParams.get("paymentdone") == "true"){
//         toast('Thanks for your donation!', {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//             transition: Bounce,
//             });
//         }
//         router.push(`/${username}`)
     
//     }, [])
    

//     const handleChange = (e) => {
//         setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
//     }

//     const getData = async () => {
//         let u = await fetchuser(username)
//         setcurrentUser(u)
//         let dbpayments = await fetchpayments(username)
//         setPayments(dbpayments) 
//     }


//     const pay = async (amount) => {
//         // Get the order Id 
//         let a = await initiate(amount, username, paymentform)
//         let orderId = a.id
//         var options = {
//             "key": process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
//             "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//             "currency": "INR",
//             "name": "Get Me A Chai", //your business name
//             "description": "Test Transaction",
//             "image": "https://example.com/your_logo",
//             "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//             "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
//             "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
//                 "name": "Gaurav Kumar", //your customer's name
//                 "email": "gaurav.kumar@example.com",
//                 "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
//             },
//             "notes": {
//                 "address": "Razorpay Corporate Office"
//             },
//             "theme": {
//                 "color": "#3399cc"
//             }
//         }

//         var rzp1 = new Razorpay(options);
//         rzp1.open();
//     }

    
//     return (
//         <>
           
//             <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


//             <div className='cover w-full bg-red-50 relative'>
//                 <img className='object-cover w-full h-48 md:h-[350px] shadow-blue-700 shadow-sm' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/18.gif?token-time=1743724800&token-hash=3jRRjnWnIycOk6k6K03qY-fepaDiVq5PShRw7Y2mnLQ%3D" alt="" />
//                 <div className='absolute -bottom-20 right-[33%] md:right-[46%] border-white overflow-hidden border-2 rounded-full size-36'>
//                     <img className='rounded-full object-cover size-36' width={128} height={128} src="https://imgs.search.brave.com/qlJCJCDDcSIp5FPo4dbR9jr6jhs9zKJ-AdVifvkvrxQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNC8x/MS8yOS8xOS8zMy9i/YWxkLWVhZ2xlLTU1/MDgwNF82NDAuanBn" alt="" />
//                 </div>
//             </div>
//             <div className="info flex justify-center items-center my-24 mb-32 flex-col gap-2">
//                 <div className='font-bold text-lg'>

//                     @{username}
//                 </div>
//                 <div className='text-slate-400'>
//                     Lets help {username} get a chai!

//                 </div>
//                 <div className='text-slate-400'>
//                   {payments.length} Payments .   ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
//                 </div>

//                 <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
//                     <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white px-2 md:p-10">
//                         {/* Show list of all the supporters as a leaderboard  */}
//                         <h2 className='text-2xl font-bold my-5'> Top 10 Supporters</h2>
//                         <ul className='mx-5 text-lg'>
//                             {payments.length == 0 && <li>No payments yet</li>}
//                             {payments.map((p, i) => {
//                                 return <li key={i} className='my-4 flex gap-2 items-center'>
//                                     <img width={33} src="avatar.gif" alt="user avatar" />
//                                     <span>
//                                         {p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message &quot;{p.message}&quot;
//                                     </span>
//                                 </li>
//                             })}

//                         </ul>
//                     </div>

//                     <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white px-2 md:p-10">
//                         <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
//                         <div className='flex gap-2 flex-col'>
//                             {/* input for name and message   */}
//                             <div>

//                                 <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
//                             </div>
//                             <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />


//                             <input onChange={handleChange} value={paymentform.amount} name="amount" type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />


//                             <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} type="button" className="text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-purple-100" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length<1}>Pay</button>

//                         </div>
//                         {/* Or choose from these amounts  */}
//                         <div className='flex flex-col md:flex-row gap-2 mt-5'>
//                             <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(1000)}>Pay ₹10</button>
//                             <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(2000)}>Pay ₹20</button>
//                             <button className='bg-slate-800 p-3 rounded-lg' onClick={() => pay(3000)}>Pay ₹30</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default PaymentPage
