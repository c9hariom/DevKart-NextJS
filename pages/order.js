import Router from 'next/router'
import React, { useEffect, useState } from 'react'

const Order = ({ cart, userAuth, orderId  , clearCart}) => {
  const [orderCart, setOrderCart] = useState([])
  const [orderDetails, setOrderDetails] = useState({
    _id: {
      $oid: '65f9638358afe5840443f28f'
    },
    email: 'xxxxxx9@xxxx.com',
    orderId: 'order_NoAtKtwxx4ngjhYn',
    paymentInfo: {
      razorpay_order_id: 'order_NoAtxxKtw4ngjhYn',
      razorpay_payment_id: 'pay_NoAtxxxtzQZvEqHG',
      razorpay_signature:
        '48b561a88a1exxxx33459c513927bbe1abd8a31515f578d57ab4dbbf3ea8ce51e2f3',
      status: 'signature verified',
      _id: {
        $oid: '65f96fe2439292270643c397'
      }
    },
    products: [
      {
        productId: 'plain-t-shirt-new',
        qty: 1,
        price: 1,
        name: 'Plain - Tshirt',
        variant: 'blue',
        img: '/images/tshirts/tshirt.jpg',
        _id: {
          $oid: '65f9638358afe5840443f291'
        }
      }
    ],
    address: {
      phone: 'xxxxx',
      street: 'xxxx',
      landmark: '',
      roomno: '1',
      state: 'xxxx',
      city: 'xxxx',
      zip: 'xxxx',
      _id: {
        $oid: '65f9638358afe5840443f292'
      }
    },
    amount: 100,
    status: 'paid',
    createdAt: {
      $date: '2024-03-19T10:05:55.121Z'
    },
    updatedAt: {
      $date: '2024-03-19T10:58:42.699Z'
    },
    __v: 0
  })

  useEffect(() => {
    clearCart();
    const redirectIfNotLoggedIn = setTimeout(() => {
      if (!userAuth.name) {
        Router.push('/auth/login')
      }
    }, 100)
    return () => clearTimeout(redirectIfNotLoggedIn)
  }, [userAuth])

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}api/getOrder?orderId=${orderId}`
        )
        const data = await response.json()
        setOrderCart(data.products)
        setOrderDetails(data)
        console.log(orderCart)
      } catch (error) {
        console.error('Error fetching order data:', error)
      }
    }

    fetchOrderData()

    // Cleanup function
    return () => {
      // Any cleanup code, if needed
    }
  }, [orderId])

  return (
    <div className='container m-auto'>
      <h1 className='font-bold text-xl text-center m-8'></h1>
      <div className='mx-auto'>
        <div className='flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32'>
          <a href='#' className='text-2xl font-bold text-gray-800'>
            Delivery Details
          </a>
          <div className='mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base'>
            <div className='relative'>
              <ul className='relative flex w-full items-center justify-between space-x-2 sm:space-x-4'>
                <li className='flex items-center space-x-3 text-left sm:space-x-4'>
                  <a className='flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  </a>
                  <span className='font-semibold text-gray-900'>Shopping</span>
                </li>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9 5l7 7-7 7'
                  />
                </svg>
                <li className='flex items-center space-x-3 text-left sm:space-x-4'>
                  <a className='flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  </a>
                  <span className='font-semibold text-gray-900'>Payment</span>
                </li>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9 5l7 7-7 7'
                  />
                </svg>
                <li className='flex items-center space-x-3 text-left sm:space-x-4'>
                  <a className='flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2'>
                    2
                  </a>
                  <span className='font-semibold text-gray-900'>Shipping</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32'>
          <div className='px-4 pt-8'>
            <p className='text-xl font-medium'>Order Summary</p>
            <p className='text-gray-400'>
              Check your items. And select a suitable shipping method.
            </p>
            <div className='mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6'>
              {orderCart.map((item, index) => {
                return (
                  <div
                    key={index}
                    className='flex flex-row items-center rounded-lg bg-white mb-2'
                  >
                    <img
                      className='m-2 h-24 w-28 rounded-md border object-cover object-center'
                      src={item.img}
                      alt=''
                    />
                    <div className='flex flex-col flex-grow p-2'>
                      <div className='flex justify-between items-center mb-2'>
                        <span className='font-semibold'>{item.name}</span>
                        <div className='flex'>
                          <div>
                            <button
                              className={`border-2 rounded-full w-4 h-4 focus:outline-none`}
                              style={{ backgroundColor: item.variant }}
                            ></button>
                          </div>
                        </div>
                        <span className='text-gray-400'>{item.size}</span>
                      </div>
                      <hr className='mt-2 mb-2' />
                      <div className='flex justify-between items-center mb-2'>
                        <span className='font-semibold'>
                          ${item.price} X {item.qty}{' '}
                        </span>
                        <span className='font-semibold'>
                          ${item.price * item.qty}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='mt-10 bg-gray-50 px-4 pt-8 lg:mt-0'>
            <p className='text-xl font-medium'>Delievery Details</p>

            <div className=' shadow-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr>
                    <th colSpan={2} className='px-6 py-3 ml-auto bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>
                      <div className='flex items-center justify-center space-x-2'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-6 w-6 text-green-500 animate-bounce'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M5 13l4 4L19 7'
                          />
                        </svg>
                        <p className='text-green-500'>Order Confirmed!</p>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className=' divide-y divide-gray-200'>
                  <tr>
                    <td className='px-6 py-4 whitespace-no-wrap'>Amount</td>
                    <td className='px-6 py-4 whitespace-no-wrap'>
                      {orderDetails.amount / 100}
                    </td>
                  </tr>
                  <tr>
                    <td className='px-6 py-4 whitespace-no-wrap'>OrderID</td>
                    <td className='px-6 py-4 whitespace-no-wrap'>
                      #{orderDetails.paymentInfo.razorpay_order_id}
                    </td>
                  </tr>
                  <tr>
                    <td className='px-6 py-4 whitespace-no-wrap'>PaymentID</td>
                    <td className='px-6 py-4 whitespace-no-wrap'>
                      #{orderDetails.paymentInfo.razorpay_payment_id}
                    </td>
                  </tr>
                  <tr>
                    <td className='px-6 py-4 whitespace-no-wrap'>Status</td>
                    <td className='px-6 py-4 whitespace-no-wrap'>
                      {orderDetails.paymentInfo.status}
                    </td>
                  </tr>
                  <tr>
                    <td className='px-6 py-4 whitespace-no-wrap'>Address</td>
                    <td className='px-6 py-4 whitespace-no-wrap'>
                    {`${orderDetails.address.roomno}, ${orderDetails.address.street}, ${orderDetails.address.zip}, ${orderDetails.address.city}, ${orderDetails.address.state}`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async context => {
  const orderId = context.query.orderId
  return { props: { orderId } }
}

export default Order
