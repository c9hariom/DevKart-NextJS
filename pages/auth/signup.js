import Link from 'next/link'
import React from 'react'

const Singup = () => {
  return (
    <>
  <div className="w-full max-w-sm mx-auto overflow-hidden bg-white border dark:bg-gray-800 mt-10">
  <div className="px-6 py-4">

      <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200"><span className='ml-3 text-xl'>&lt;/devkart&gt;</span></h3>

      <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>

      <form>
          <div className="w-full mt-4">
              <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Your Name" aria-label="Your Name" />
          </div>

          <div className="w-full mt-4">
              <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address" />
          </div>

          <div className="w-full mt-4">
              <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" />
          </div>

          <div className="w-full mt-4">
              <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Repeat Password" aria-label="Password" />
          </div>

          <div className=" w-full mt-4 flex justify-center">
          <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Sign Up
                </button>
</div>

      </form>
  </div>

  <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
      <span className="text-sm text-gray-600 dark:text-gray-200">Already have an account? </span>

      <Link href="/auth/login" className="mx-2 text-sm font-bold text-red-500 dark:text-blue-400 hover:underline">Login</Link>
  </div>
</div></>
  )
}

export default Singup
