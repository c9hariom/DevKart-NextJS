import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Orders = ({userAuth}) => {
  let router = useRouter()
  useEffect(() => {
    if (!userAuth.name) {
      router.push('/')
    }
  })
  return (
    <div>
      hi this is order page of user
    </div>
  )
}

export default Orders
