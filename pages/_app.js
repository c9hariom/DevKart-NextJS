import Navbar from '@/components/navbar'
import '@/styles/globals.css'
import Head from 'next/head'
import Footer from '@/components/footer'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function App ({ Component, pageProps }) {
  const router = useRouter()

  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart')
      if (storedCart) {
        setCart(JSON.parse(storedCart))
        let keys = Object.keys(JSON.parse(storedCart))
        let subt = 0
        for (let i = 0; i < keys.length; i++) {
          subt =
            JSON.parse(storedCart)[keys[i]].price *
            JSON.parse(storedCart)[keys[i]].qty
        }
        setSubTotal(subt)
      }
    } catch (error) {
      console.error(error)
      localStorage.removeItem('cart')
    }
  }, [])

  const buyNow = ({ itemCode, qty, price, name, size, variant, img, max }) => {
    localStorage.removeItem('cart')

    let newCart = {}
    newCart[itemCode + '_2_' + variant + '_2_' + size] = {
      qty,
      price,
      name,
      size,
      variant,
      img,
      max
    }

    setCart(newCart)
    saveCart(newCart)

    router.push('/checkout')
  }

  const addToCart = ({
    itemCode,
    qty,
    price,
    name,
    size,
    variant,
    img,
    max
  }) => {
    // console.log({ itemCode, qty, price, name, size, variant, img, max })
    if (qty >= max) {
      return null
    }

    let newCart = { ...cart }
    if (!newCart[itemCode]) {
      newCart[itemCode + '_2_' + variant + '_2_' + size] = {
        qty,
        price,
        name,
        size,
        variant,
        img,
        max
      }
    } else newCart[itemCode].qty += qty

    let keys = Object.keys(newCart)
    for (let i = 0; i < keys.length; i++) {
      if (newCart[keys[i]].qty <= 0) {
        delete newCart[keys[i]]
      }
    }
    setCart(newCart)
    saveCart(newCart)
  }

  const removeFromCart = (
    itemCode,
    qty,
    price,
    name,
    size,
    variant,
    img,
    max
  ) => {
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty - qty
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode]
    }
    setCart(newCart)
    saveCart(newCart)
  }

  const saveCart = myCart => {
    localStorage.removeItem('cart')
    localStorage.setItem('cart', JSON.stringify(myCart))
    let subt = 0
    let keys = Object.keys(myCart)
    // console.log(keys)
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty
    }
    // console.log(subt)
    setSubTotal(subt)
  }

  const clearCart = () => {
    // console.log("hi")
    setCart({})
    saveCart({})
  }
  const [userAuth, setUserAuth] = useState({
    name: '',
    email: '',
    authToken: ''
  })
  useEffect(() => {
    let userAuth = JSON.parse(localStorage.getItem('userAuth'))
    if (userAuth) {
      setUserAuth(userAuth)
    }
  }, [])

  const handleLogin = () => {
    console.log('login')
    if (userAuth.name !== '') {
      localStorage.removeItem('userAuth')
      setUserAuth({
        name: '',
        email: '',
        authToken: ''
      })
      router.push('/auth/login')
    } else {
      router.push('/auth/login')
    }
  }

  return (
    <>
      <Head>
        <title>DevKart - e-com for devs</title>
        <meta name='description' content='Your page description' />
      </Head>
      <Navbar
        handleLogin={handleLogin}
        userAuth={userAuth}
        addToCart={addToCart}
        cart={cart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
      <Component
        handleLogin={handleLogin}
        userAuth={userAuth}
        setUserAuth={setUserAuth}
        {...pageProps}
        buyNow={buyNow}
        addToCart={addToCart}
        cart={cart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
      <Footer />
    </>
  )
}
