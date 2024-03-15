import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaCartPlus } from 'react-icons/fa6'
import { RxCross1 } from 'react-icons/rx'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Navbar = ({
  clearCart,
  addToCart,
  removeFromCart,
  subTotal,
  cart,
  userAuth,
  handleLogin
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const [toggle, setToggle] = useState('hidden')
  const handleToggle = () => {
    console.log('clicked')
    if (toggle === 'hidden') {
      setToggle('')
      setTimeout(() => {
        setToggle('hidden')
      }, 4000)
    } else {
      setToggle('hidden')
    }
  }

  return (
    <div>
      <header className='text-gray-600 body-font'>
        <ToastContainer></ToastContainer>
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
              <div className='fixed top-0 right-0 bottom-0 bg-white shadow-lg p-4 w-[360px] z-10  overflow-y-scroll'>
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
                  // console.log(cart)
                  return (
                    <div
                      key={keys}
                      className='flex justify-between items-center mb-2 rounded-lg p-2 shadow-lg'
                    >
                      <img
                        src={cart[keys].img}
                        alt='Product Image'
                        className='w-12 h-12 mr-2'
                      />
                      <div style={{ fontWeight: 'normal', fontSize: '15px' }}>
                        <p>{cart[keys].name}</p>

                        <div className='flex items-center  border-gray-100'>
                          <div className='flex'>
                            <div>
                              <button
                                className={`border-2 rounded-full w-4 h-4 focus:outline-none`}
                                style={{ backgroundColor: cart[keys].variant }}
                              ></button>
                            </div>
                          </div>
                          <div className='mx-4'>{cart[keys].size}</div>
                          <p className='mx-4'>${cart[keys].price}</p>
                        </div>
                      </div>

                      <div className='flex items-center  square-full bg-gray-100 px-2 py-0'>
                        <button
                          onClick={() => {
                            addToCart({
                              itemCode: keys,
                              qty: -1,
                              price: cart[keys].price,
                              name: cart[keys].name,
                              size: cart[keys].size,
                              variant: cart[keys].variant,
                              img: cart[keys].img,
                              max: cart[keys].max
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
                          disabled={cart[keys].qty >= cart[keys].max}
                          onClick={() => {
                            addToCart({
                              itemCode: keys,
                              qty: 1,
                              price: cart[keys].price,
                              name: cart[keys].name,
                              size: cart[keys].size,
                              variant: cart[keys].variant,
                              img: cart[keys].img,
                              max: cart[keys].max
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
                <Link
                  href={subTotal === 0 ? '#' : '/checkout'}
                  className='m-2 inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded'
                  onClick={() => {
                    if (subTotal === 0) {
                      toast("Cart is empty, can't checkout!", {
                        position: 'top-left',
                        autoClose: 1200,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                      })
                    }
                  }}
                >
                  Checkout
                </Link>

                <button
                  onClick={clearCart}
                  className='inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded'
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          <div className='relative'>
            <div>
              <button
                type='button'
                className='relative flex rounded-full  text-sm focus:outline-none  '
                id='user-menu-button'
                aria-expanded='false'
                aria-haspopup='true'
                onClick={handleToggle}
              >
                <img className='h-8 w-8 rounded' src='/user.png' alt='' />
              </button>
            </div>
            <button
              className={`${toggle} absolute right-0 z-5 mt-2 w-28 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='user-menu-button'
              tabIndex='-1'
              id='user-menu'
            >
              <div className='items-left justify-content-start'>
                {userAuth.name !== '' && (
                  <a
                    href='#'
                    className='block  py-1 text-sm text-gray-700'
                    role='menuitem'
                    tabIndex='-1'
                    id='user-menu-item-0'
                  >
                    My Account
                  </a>
                )}
                {userAuth.name !== '' && (
                  <a
                    href='#'
                    className='block  py-1 text-sm text-gray-700'
                    role='menuitem'
                    tabIndex='-1'
                    id='user-menu-item-0'
                  >
                    Orders
                  </a>
                )}
                <a
                  href='#'
                  className='block px-4 py-1 text-sm text-gray-700'
                  role='menuitem'
                  tabIndex='-1'
                  id='user-menu-item-2'
                  onClick={handleLogin}
                >
                  {userAuth.name === '' ? 'Sign In' : 'Sign Out'}
                </a>
              </div>
            </button>
          </div>

          {/* <button
            onClick={handleLogin}
            className='inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'
          >
            {userAuth.name || "Login"}
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
          </button> */}
        </div>
      </header>
    </div>
  )
}

export default Navbar
