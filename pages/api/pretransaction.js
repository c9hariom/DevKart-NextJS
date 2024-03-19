import Order from '@/models/Order'
import connectDb from '@/middleware/mongoose'

export default async function handler (req, res) {
  try {
    // console.log(req.body)

    connectDb()

    const Razorpay = require('razorpay')

    if (!process.env.RAZOR_KEY || !process.env.RAZOR_SECRET) {
      throw new Error('Razorpay key_id or key_secret not provided')
    }

    var instance = new Razorpay({
      key_id: process.env.RAZOR_KEY,
      key_secret: process.env.RAZOR_SECRET
    })

    var options = {
      amount: Number(req.body.amount * 100), // amount in the smallest currency unit
      currency: 'INR'
    }

    // check if cart is tampered

    // check if item is out of stock

    // check if the details are valid




    const order = await instance.orders.create(options)
    // console.log(order)
    let billing = req.body.billing

    let orderdb = new Order({
      email: req.body.email,
      orderId: order.id,
      products: req.body.cart,
      paymentInfo:{},
      address: {
        phone: billing.phone,
        street: billing.street,
        landmark: billing.landmark,
        roomno: billing.roomno,
        state: billing.state,
        city: billing.city,
        zip: billing.zip
      },
      amount: options.amount,
      status: order.status
    })

    let orderdbstatus = await orderdb.save()

    res.status(200).json(orderdbstatus)
  } catch (error) {
    console.error('Error in API route:', error)
    res.status(500).json({ error: error.message })
  }
}
