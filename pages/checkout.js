import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import Head from 'next/head'
import Router from 'next/router'
const crypto = require('crypto')

const Checkout = ({ cart, subTotal, userAuth }) => {
  let shipping = 8

  const checkoutHandler = async amount => {
    if (amount === 0) {
      toast("Cart is empty, can't place order!", {
        position: 'top-left',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        type: 'warning'
      })
      Router.push('/')
      return null
    }

    if (userAuth.name === '') {
      toast('Pls login before initiating checkout', {
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
      Router.push('/auth/login')
      return null
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}api/pretransaction`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount })
      }
    )

    const data = await response.json()
    console.log(data)

    var options = {
      key: process.env.RAZOR_KEY,
      amount: data.amount,
      currency: 'INR',
      name: 'Devkart',
      description: 'Test Transaction',
      image: '',
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      // handler: function (response) {
      //   alert(response.razorpay_payment_id)
      //   alert(response.razorpay_order_id)
      //   alert(response.razorpay_signature)

      //   console.log(response)

      //   const generated_signature = crypto
      //     .createHmac('sha256', 'E7nfrqiAf055GZ75RvcbXdyh')
      //     .update(
      //       response.razorpay_order_id + '|' + response.razorpay_payment_id
      //     )
      //     .digest('hex')

      //   // hmac_sha256(response.razorpay_order_id + "|" + response.razorpay_signature, process.env.RAZOR_SECRET);

      //   if (generated_signature == response.razorpay_signature) {
      //     console.log('success')
      //     console.log(generated_signature)
      //   } else {
      //     console.log(generated_signature)
      //     console.log('payment error')
      //   }
      // },
      callback_url: `${process.env.NEXT_PUBLIC_HOST}api/posttransaction`,
      prefill: {
        name: userAuth.name,
        email: userAuth.email
      },
      notes: {
        address: 'Razorpay Corporate Office'
      },
      theme: {
        color: '#ef4444'
      }
    }
    var rzp1 = new Razorpay(options)
    // rzp1.on('payment.failed', function (response) {
    //   alert(response.error.code)
    //   alert(response.error.description)
    //   alert(response.error.source)
    //   alert(response.error.step)
    //   alert(response.error.reason)
    //   alert(response.error.metadata.order_id)
    //   alert(response.error.metadata.payment_id)
    // })
    rzp1.open()
  }

  return (
    <div className='container m-auto'>
      <Head>
        <script src='https://checkout.razorpay.com/v1/checkout.js'></script>
      </Head>
      <h1 className='font-bold text-xl text-center m-8'>Checkout</h1>
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
                  <span className='font-semibold text-gray-900'>Shop</span>
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
                  <a className='flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white'>
                    3
                  </a>
                  <span className='font-semibold text-gray-500'>Payment</span>
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
              {Object.keys(cart).map(keys => {
                return (
                  <div
                    key={keys}
                    className='flex flex-row items-center rounded-lg bg-white mb-2'
                  >
                    <img
                      className='m-2 h-24 w-28 rounded-md border object-cover object-center'
                      src={cart[keys].img}
                      alt=''
                    />
                    <div className='flex flex-col flex-grow p-2'>
                      <div className='flex justify-between items-center mb-2'>
                        <span className='font-semibold'>{cart[keys].name}</span>
                        <div className='flex'>
                          <div>
                            <button
                              className={`border-2 rounded-full w-4 h-4 focus:outline-none`}
                              style={{ backgroundColor: cart[keys].variant }}
                            ></button>
                          </div>
                        </div>
                        <span className='text-gray-400'>{cart[keys].size}</span>
                      </div>
                      <hr className='mt-2 mb-2' />
                      <div className='flex justify-between items-center mb-2'>
                        <span className='font-semibold'>
                          ${cart[keys].price} X {cart[keys].qty}{' '}
                        </span>
                        <span className='font-semibold'>
                          ${cart[keys].price * cart[keys].qty}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* <p className="mt-8 text-lg font-medium">Shipping Methods</p>
      <form className="mt-5 grid gap-6">
        <div className="relative">
          <input className="peer hidden" id="radio_1" type="radio" name="radio" checked />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
            <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
            <div className="ml-5">
              <span className="mt-2 font-semibold">Fedex Delivery</span>
              <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
            </div>
          </label>
        </div>
        <div className="relative">
          <input className="peer hidden" id="radio_2" type="radio" name="radio" checked />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
            <img className="w-14 object-contain" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt="" />
            <div className="ml-5">
              <span className="mt-2 font-semibold">Fedex Delivery</span>
              <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
            </div>
          </label>
        </div>
      </form> */}
          </div>
          <div className='mt-10 bg-gray-50 px-4 pt-8 lg:mt-0'>
            <p className='text-xl font-medium'>Payment Details</p>
            <p className='text-gray-400'>
              Complete your order by providing your payment details.
            </p>
            <div className=''>
              <label
                htmlFor='email'
                className='mt-4 mb-2 block text-sm font-medium'
              >
                Email
              </label>
              <div className='relative'>
                <input
                  type='text'
                  id='email'
                  name='email'
                  className='w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                  placeholder='your.email@gmail.com'
                />
                <div className='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
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
                      d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                    />
                  </svg>
                </div>
              </div>
              <label
                htmlFor='card-holder'
                className='mt-4 mb-2 block text-sm font-medium'
              >
                Card Holder
              </label>
              <div className='relative'>
                <input
                  type='text'
                  id='card-holder'
                  name='card-holder'
                  className='w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                  placeholder='Your full name here'
                />
                <div className='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
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
                      d='M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z'
                    />
                  </svg>
                </div>
              </div>
              <label
                htmlFor='card-no'
                className='mt-4 mb-2 block text-sm font-medium'
              >
                Card Details
              </label>
              <div className='flex'>
                <div className='relative w-7/12 flex-shrink-0'>
                  <input
                    type='text'
                    id='card-no'
                    name='card-no'
                    className='w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                    placeholder='xxxx-xxxx-xxxx-xxxx'
                  />
                  <div className='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                    <svg
                      className='h-4 w-4 text-gray-400'
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      viewBox='0 0 16 16'
                    >
                      <path d='M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z' />
                      <path d='M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z' />
                    </svg>
                  </div>
                </div>
                <input
                  type='text'
                  name='credit-expiry'
                  className='w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                  placeholder='MM/YY'
                />
                <input
                  type='text'
                  name='credit-cvc'
                  className='w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                  placeholder='CVC'
                />
              </div>
              <label
                htmlFor='billing-address'
                className='mt-4 mb-2 block text-sm font-medium'
              >
                Billing Address
              </label>
              <div className='flex flex-col sm:flex-row'>
                <div className='relative flex-shrink-0 sm:w-7/12'>
                  <input
                    type='text'
                    id='billing-address'
                    name='billing-address'
                    className='w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                    placeholder='Street Address'
                  />
                  <div className='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                    <img
                      className='h-4 w-4 object-contain'
                      src='https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg'
                      alt=''
                    />
                  </div>
                </div>
                <select
                  type='text'
                  name='billing-state'
                  className='w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                >
                  <option value='State'>State</option>
                </select>
                <input
                  type='text'
                  name='billing-zip'
                  className='flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                  placeholder='ZIP'
                />
              </div>

              <div className='mt-6 border-t border-b py-2'>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-medium text-gray-900'>Subtotal</p>
                  <p className='font-semibold text-gray-900'>${subTotal}</p>
                </div>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-medium text-gray-900'>Shipping</p>
                  <p className='font-semibold text-gray-900'>
                    +${Object.keys(cart).length === 0 ? 0 : 8}
                  </p>
                </div>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-medium text-gray-900'></p>
                  <p className='font-semibold text-gray-900'>
                    -${Object.keys(cart).length === 0 ? 0 : 8}
                  </p>
                </div>
              </div>
              <div className='mt-6 flex items-center justify-between'>
                <p className='text-sm font-medium text-gray-900'>Total</p>
                <p className='text-2xl font-semibold text-gray-900'>
                  ${subTotal + (+Object.keys(cart).length === 0 ? 0 : 0)}
                </p>
              </div>
            </div>

            <button
              id='rzp-button1'
              onClick={() => {
                checkoutHandler(subTotal)
              }}
              className='mt-4 mb-8 w-full rounded-md bg-red-500 px-6 py-3 font-medium text-white'
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
