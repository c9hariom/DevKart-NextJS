import Link from 'next/link'
import React from 'react'

const Forgot = () => {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
    <div className="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
        

        <h1 className="mt-4 text-2xl font-semibold tracking-wide text-center text-gray-800 capitalize md:text-3xl dark:text-white">
            Reset your password
        </h1>

        {/* <div className="flex items-center mt-6">
            <p className="text-gray-500 dark:text-gray-400">continue as</p>

            <div className="flex items-center mx-2">
                <img className="object-cover w-8 h-8 mx-1 rounded-full" src="https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt=""/>
                <span className="mx-1 text-gray-800 dark:text-white">Ana Williams...</span>
            </div>

            <button className="text-red-500 dark:text-red-400 focus:outline-none hover:underline">change</button>
        </div> */}

        <div className="w-full max-w-md mx-auto mt-6">
            <form>
                <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email</label>
                    <input type="password" placeholder="Enter your email" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>

                <Link href="/auth/login" className="inline-block mt-4 text-red-500 capitalize hover:underline dark:text-red-400">
                    Login?
                </Link>

                <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50">
                    “Continue”
                </button>

                <div className="mt-6 text-center">
                    <Link href="/auth/signup" className="text-sm text-red-500 hover:underline dark:text-red-400">
                        Don’t have an account yet? Sign up
                    </Link>
                </div>

                <p className="mt-6 text-gray-500 dark:text-gray-400">
                We will sent you an email with instruction to reset password if that matches to an account.
                </p>
            </form>
        </div>
    </div>
</section>
    </div>
  )
}

export default Forgot
