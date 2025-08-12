import Link from 'next/link'
export default function Home() {
  return (
    <>
      <div className="text-white flex justify-center flex-col gap-4 items-center h-[48vh] px-5 md:px-0 text-xs md:text-base">

      {/* https://giphy.com/BoosteWallet USE THIS SITE FOR GIF */}

        <div className="flex font-bold gap-6  text-3xl md:text-5xl ">BoostMeUp <span>      <img width={64} src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjJ0NWc0MjNwOHBsYzM3Y2VjNW55ZG9tcXVta3YwZW04bndvd2tidyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JmUd8L6SMdTrriXSEc/giphy.gif" alt="" />
        </span></div>
        <p className='text-center md:text-left'>
          A crowdfunding platform for creaters to fund their projects
        </p>
        <p className='text-center md:text-left'>
          Unleash the power of your fans and get your projects funded
        </p>
        <div>
          {/* i have taken this button from tailwind flobite website */}
          <Link href={"/login"}>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Start Here
            </span>
          </button>
          </Link>
          <Link href={"/about"}>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Read More
            </span>
          </button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-12"></div>
      <div className="text-white pb-14">
        <h1 className="text-3xl font-bold text-center my-14">Your Fans Can Fund You</h1>
        <div className="flex gap-5 justify-around">
        <div className="gap-y-3 flex flex-col justify-center items-center">
            <img className="rounded-full p-2" width={148} src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdm85NzF1eDk3Yjd2bGhyeTdnbGQxNGQycW94YXg5ZW1qdmVrOTIzMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iT4mD0DeQUZE4Ghjt3/giphy.gif" alt="" />
            <p className="font-bold text-center">Fans want to help</p>
            <p className='text-center'>Your fans are available to support you</p>
          </div>
          <div className="gap-y-3 flex flex-col justify-center items-center">
            <img className="rounded-full p-2" width={148} src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWF5aXBrN2hyZm9sczJvcnhwNGJoZDg1bTBheXA5aHF5bXhiaTlncyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/U4diah5thyZscLGakl/giphy.gif" alt="" />
            <p className="font-bold text-center">Fans want to contribute</p>
            <p className='text-center'>Your fans are willing to contribute financially</p>
          </div>
          <div className="gap-y-3 flex flex-col justify-center items-center">
            <img className="rounded-full p-2" width ={148} src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3h0NmR5djhzYnNibnp1MGhpc3E0c3doNjh6d2RlZTIzOTZxanFpMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/g6DvfVO2gAuDKuxMVl/giphy.gif" alt="" />
            <p className="font-bold text-center">Fans want to collaborate</p>
            <p className='text-center'>Your fans are ready to collaborate with you</p>
          </div>
        </div>
      </div>
      {/* <div className="bg-white h-1 opacity-12"></div>
      <div className="text-white pb-14">
        <h1 className="text-3xl font-bold text-center my-14">Your Fans can buy you a product</h1>
        <div className="flex gap-5 justify-around">
        <div className="gap-y-3 flex flex-col justify-center items-center">
            <img className="rounded-full" width={88} src="man.jpg" alt="" />
            <p className="font-bold">Fans want to help</p>
            <p>Your fans are available to support you</p>
          </div>
          <div className="gap-y-3 flex flex-col justify-center items-center">
            <img className="rounded-full" width={88} src="coin.jpg" alt="" />
            <p className="font-bold">Fans want to contribute</p>
            <p>Your fans are willing to contribute financially</p>
          </div>
          <div className="gap-y-3 flex flex-col justify-center items-center">
            <img className="rounded-full" width ={88} src="3 person.jpg" alt="" />
            <p className="font-bold">Fans want to collaborate</p>
            <p>Your fans are ready to collaborate with you</p>
          </div>
        </div>
      </div> */}
      {/* <div className="bg-white h-1 opacity-12"></div>
      <div className="text-white pb-14 flex flex-col items-center ">
        <h1 className="text-3xl font-bold text-center my-14">Learn more about us</h1>
        <div className="w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/Vi9bxu-M-ag?si=X887acNNtI7tFuIa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div> */}
      <div className="bg-white h-1 opacity-12"></div>

       <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-14">Learn more about us</h2>
        {/* Responsive youtube embed  */}
        <div className="w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">
          <iframe className="w-full h-full" src="https://www.youtube.com/embed/Vi9bxu-M-ag?si=X887acNNtI7tFuIa" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

          </div>
      
      </div>
    </>
  );
}
