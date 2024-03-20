import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import useRouter from 'next/router'
import React, { useEffect, useState } from 'react'

const Orders = ({ userAuth }) => {
  useEffect(() => {
    const redirectIfNotLoggedIn = setTimeout(() => {
      if (!userAuth.name) {
        Router.push('/auth/login')
      }
    }, 100)
    return () => clearTimeout(redirectIfNotLoggedIn)
  }, [userAuth])

  const [orders, setOrders] = useState([])
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}api/getOrders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userAuth)
        })
        const data = await response.json()

        console.log(data)

        if (data.status == 'success') {
          setOrders(data.order.reverse()          )
        }
      } catch (error) {
        console.error('Error fetching order data:', error)
      }
    }

    fetchOrderData()

    // Cleanup function
    return () => {
      // Any cleanup code, if needed
    }
  }, [userAuth.authToken])

  return (
    <div>
      <div className='mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6'>
        {orders.length !== 0 &&
          orders.map((item, index) => (
            <div
              className='p-4 lg:w-7/12 m-auto  bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700'
              key={index}
            >
              <div className='flex items-center justify-between mb-4'>
                <h5 className='text-xl font-bold leading-none text-gray-900 dark:text-white'>
                  #{item.orderId}
                </h5>
                <Link
                  href={'/user/orderInfo?orderId=' + item.orderId}
                  className='text-sm font-medium text-blue-600 hover:underline dark:text-blue-500'
                >
                  View Details
                </Link>
              </div>
              <div className='flow-root'>
                <ul
                  role='list'
                  className='divide-y divide-gray-200 dark:divide-gray-700'
                >
                  <li className='py-3 sm:py-4'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0'>
                        <img
                          className='w-8 h-8 rounded-full'
                          src={item.products[0].img}
                          alt='Neil image'
                        />
                      </div>
                      <div className='flex-1 min-w-0 ms-4'>
                        <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                          {item.products[0].name}
                        </p>
                        <p className='text-sm text-gray-500 truncate dark:text-gray-400'>
                          Qty : {item.products.length}
                        </p>
                      </div>
                      <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                        $ {item.amount / 100} ({item.status})
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Orders
