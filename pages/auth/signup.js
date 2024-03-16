import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Singup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [auth, setAuth] = useState({
    name: '',
    email: '',
    password: '',
    repPassword: ''
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

    if (auth.repPassword !== auth.password) {
      toast('Password should be same', {
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
      return null
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(auth)
    })

    const data = await response.json()
    if(data.status ==="success"){
        toast('User ' + auth.name +' created', {
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
    }else if(data.code==11000){
        console.log(data)
        toast(auth.email+" already registered", {
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
    
    else {
        console.log(data)
        toast(data.message, {
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
      <div className='w-full max-w-sm mx-auto overflow-hidden bg-white border dark:bg-gray-800 mt-10'>
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
                type='text'
                name='name'
                placeholder='Your Name'
                aria-label='Your Name'
                required
                minLength={3}
                onChange={changeHandler}
              />
            </div>

            <div className='w-full mt-4'>
              <input
                className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                type='email'
                placeholder='Email Address'
                aria-label='Email Address'
                required
                minLength={3}
                name='email'
                onChange={changeHandler}
              />
            </div>

            <div className='w-full mt-4'>
              <input
                className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                type='password'
                placeholder='Password'
                aria-label='Password'
                required
                minLength={4}
                name='password'
                onChange={changeHandler}
              />
            </div>

            <div className='w-full mt-4'>
              <input
                className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                type='password'
                placeholder='Repeat Password'
                aria-label='Password'
                required
                minLength={4}
                onChange={changeHandler}
                name='repPassword'
              />
            </div>

            <div className=' w-full mt-4 flex justify-center'>
              <button
                className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
                onClick={handleSubmit}
                type='submit'
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

        <div className='flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700'>
          <span className='text-sm text-gray-600 dark:text-gray-200'>
            Already have an account?{' '}
          </span>

          <Link
            href='/auth/login'
            className='mx-2 text-sm font-bold text-red-500 dark:text-blue-400 hover:underline'
          >
            Login
          </Link>
        </div>
      </div>
    </>
  )
}

export default Singup
