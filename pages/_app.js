import Navbar from '@/components/navbar'
import '@/styles/globals.css'
import Head from 'next/head'
import Footer from '@/components/footer'
import { useEffect, useState } from 'react'

export default function App ({ Component, pageProps }) {
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

  const addToCart = ({ itemCode, qty, price, name, size, variant, img, max }) => {
    console.log({ itemCode, qty, price, name, size, variant, img, max })
    if(qty>=max){
      return null
    }

    let newCart = { ...cart }
    if (!newCart[itemCode]) {
      newCart[itemCode] = { qty, price, name, size, variant, img, max }
    } else newCart[itemCode].qty += qty

    let keys = Object.keys(newCart)
    for (let i = 0; i < keys.length; i++) {
      if (newCart[keys[i]].qty <= 0) {
        delete newCart[keys[i]]
      }
    }
    // console.log(newCart)
    setCart(newCart)
    saveCart(newCart)
  }

  const removeFromCart = (itemCode, qty, price, name, size, variant , img , max) => {
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
    for (let i = 0; i < keys.length; i++) {
      subt = myCart[keys[i]].price * myCart[keys[i]].qty
    }
    // console.log(subt)
    setSubTotal(subt)
  }

  const clearCart = () => {
    // console.log("hi")
    setCart({})
    saveCart({})
  }

  return (
    <>
      <Head>
        <title>DevKart - e-com for devs</title>
        <meta name='description' content='Your page description' />
      </Head>
      <Navbar
        addToCart={addToCart}
        cart={cart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
      <Component
        {...pageProps}
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
