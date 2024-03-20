import useRouter from 'next/router'
import React, { useEffect } from 'react'

function Profile ({ userAuth }) {
  useEffect(() => {
    const redirectIfNotLoggedIn = setTimeout(() => {
      if (!userAuth.name) {
        Router.push('/auth/login')
      }
    }, 100)
    return () => clearTimeout(redirectIfNotLoggedIn)
  }, [userAuth])

  return (
    <div className='container m-auto mt-10 lg:w-[50%]'>
      <div className=' bg-white overflow-hidden shadow rounded-lg border'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            User Profile
          </h3>
        </div>
        <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
          <dl className='sm:divide-y sm:divide-gray-200'>
            <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Full Name</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {userAuth.name}
              </dd>
            </div>
            <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Email address
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                {userAuth.email}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Profile
