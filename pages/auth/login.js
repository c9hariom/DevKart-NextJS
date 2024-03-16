import Link from 'next/link'
import Router from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Login = ({ setUserAuth }) => {
  const [auth, setAuth] = useState({
    email: '',
    password: ''
  })

  const changeHandler = e => {
    const { name, value } = e.target
    setAuth(prevAuth => ({
      ...prevAuth,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { email, password } = auth
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(auth)
    })

    const data = await response.json()

    if (data.authToken) {
      let userAuth = {
        name: data.name,
        email: data.email,
        authToken: data.authToken
      }
      localStorage.setItem('userAuth', JSON.stringify(userAuth))
      toast('Hi ' + data.name + ' good to see you back', {
        position: 'top-left',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: 'success'
      })
      setTimeout(() => {
        setUserAuth(userAuth)
        Router.push('/')
      }, 400)
    } else {
      toast('Oops ' + data.status, {
        position: 'top-left',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: 'error'
      })
    }
  }

  return (
    <>
      <div className='w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 mt-10'>
        <div className='px-6 py-4'>
          <h3 className='mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200'>
            <span className='ml-3 text-xl'>&lt;/devkart&gt;</span>
          </h3>

          <p className='mt-1 text-center text-gray-500 dark:text-gray-400'>
            Login or create account
          </p>

          <form>
            <div className='w-full mt-4'>
              <input
                className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                type='email'
                placeholder='Email Address'
                aria-label='Email Address'
                onChange={changeHandler}
                name='email'
                required
              />
            </div>

            <div className='w-full mt-4'>
              <input
                className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                type='password'
                placeholder='Password'
                aria-label='Password'
                onChange={changeHandler}
                name='password'
                required
                minLength={4}
              />
            </div>

            <div className='flex items-center justify-between mt-4'>
              <Link
                href='/auth/forgot'
                className='text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500'
              >
                Forget Password?
              </Link>

              <button
                className='px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
                type='submit'
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>

        <div className='flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700'>
          <span className='text-sm text-gray-600 dark:text-gray-200'>
            Don't have an account?{' '}
          </span>

          <Link
            href='/auth/signup'
            className='mx-2 text-sm font-bold text-red-500 dark:text-blue-400 hover:underline'
          >
            Register
          </Link>
        </div>
      </div>
    </>
  )
}

export default Login
