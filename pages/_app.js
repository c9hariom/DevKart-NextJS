import Navbar from '@/components/navbar'
import '@/styles/globals.css'
import Head from 'next/head'
import Footer from '@/components/footer'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import LoadingBar from 'react-top-loading-bar'

export default function App ({ Component, pageProps }) {
  const router = useRouter()

  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)

  const [isCartOpen, setIsCartOpen] = useState(false)

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

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

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })

    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })

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

  // check user authtoken and handle login and logout at session start

  const [tokenStatus, setTokenStatus] = useState(false)
  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/checkToken`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userAuth)
        })
        const data = await response.json()
        if (data.status == 'success') {
          setTokenStatus(true)
        } else {
          localStorage.removeItem('userAuth')
        }
      } catch (error) {
        console.error('Error fetching order data:', error)
      }
    }
    if (!tokenStatus) {
      checkToken()
    }
    return () => {}
  }, [userAuth.authToken])

  return (
    <>
      <Head>
        <title>DevKart - e-com for devs</title>
        <meta name='description' content='Your page description' />
      </Head>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar
        handleLogin={handleLogin}
        toggleCart={toggleCart}
        isCartOpen={isCartOpen}
        userAuth={userAuth}
        addToCart={addToCart}
        cart={cart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
      <Component
        handleLogin={handleLogin}
        toggleCart={toggleCart}
        isCartOpen={isCartOpen}
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
