import React, { useState } from 'react'
import Link from 'next/link'
import { FaCartPlus } from 'react-icons/fa6'
import { RxCross1 } from 'react-icons/rx'
import { FaPlus, FaMinus } from 'react-icons/fa'

const Navbar = ({ clearCart, addToCart, removeFromCart, subTotal, cart }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }
  return (
    <div>
      <header className='text-gray-600 body-font'>
        <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
          <Link
            href='/'
            className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='w-10 h-10 text-white p-2 bg-red-500 rounded-full'
              viewBox='0 0 24 24'
            >
              <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
            </svg>
            <span className='ml-3 text-xl'>&lt;/devkart&gt;</span>
          </Link>
          <nav className='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center'>
            <Link href='/tshirts' className='mr-5 hover:text-gray-900'>
              T-shirts
            </Link>
            <Link href='/hoodies' className='mr-5 hover:text-gray-900'>
              Hoodies
            </Link>
            <Link href='/mugs' className='mr-5 hover:text-gray-900'>
              Mugs
            </Link>
            <Link href='/stickers' className='mr-5 hover:text-gray-900'>
              Stickers
            </Link>
          </nav>

          {/* <button className="inline-flex items-center bg-gray-100 relative border-0 py-2 px-2 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mx-2">
  <FaCartPlus />
  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 py-0 text-xs">5</span>
</button> */}

          <div className='relative'>
            <button
              className='inline-flex items-center bg-gray-100 relative border-0 py-2 px-2 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 mx-2'
              onClick={toggleCart}
            >
              <FaCartPlus />
              <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 py-0 text-xs'>
                {Object.keys(cart).length}
              </span>
            </button>
            {isCartOpen && (
              <div className='fixed top-0 right-0 bottom-0 bg-white shadow-lg p-4 w-[360px] z-10	'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-lg font-bold'>Your Cart</h2>
                  <button className='text-gray-600' onClick={toggleCart}>
                    <RxCross1 />
                  </button>
                </div>
                {Object.keys(cart).length === 0 && (
                  <div className='my-2 mx-2 font-normal'>
                    No items in the cart
                  </div>
                )}

                {Object.keys(cart).map(keys => {
                  return (
                    <div
                      key={keys}
                      className='flex justify-between items-center mb-2 rounded-lg p-2 shadow-lg'
                    >
                      <img
                        src='/tshirt.jpg'
                        alt='Product Image'
                        className='w-12 h-12 mr-2'
                      />
                      <div style={{ fontWeight: 'normal', fontSize: '15px' }}>
                        <p>{cart[keys].name}</p>
                      </div>
                      <div className='flex items-center  square-full bg-gray-100 px-2 py-0'>
                        <button
                          onClick={() => {
                            addToCart({
                              itemCode: '1234',
                              qty: -1,
                              price: 123,
                              name: 't-shirts',
                              size: 'M',
                              variant: 'white'
                            })
                          }}
                          className='rounded-full  p-0'
                        >
                          <FaMinus />
                        </button>
                        <span className='mx-2  px-2 bg-white'>
                          {cart[keys].qty}
                        </span>
                        <button
                          onClick={() => {
                            addToCart({
                              itemCode: '1234',
                              qty: 1,
                              price: 123,
                              name: 't-shirts',
                              size: 'M',
                              variant: 'white'
                            })
                          }}
                          className='rounded-full  p-0'
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  )
                })}

                <h2
                  className='mx-2 mt-6'
                  style={{ fontWeight: 'bold', fontSize: '16px' }}
                >
                  Subtotal : {subTotal}
                </h2>

                <br />
                <button className='m-2 inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded'>
                  Checkout
                </button>
                <button
                  onClick={clearCart}
                  className='inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded'
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          <Link
            href='/login'
            className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'
          >
            Login
            <svg
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='w-4 h-4 ml-1'
              viewBox='0 0 24 24'
            >
              <path d='M5 12h14M12 5l7 7-7 7'></path>
            </svg>
          </Link>
        </div>
      </header>
    </div>
  )
}

export default Navbar
