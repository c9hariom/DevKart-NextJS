// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler (req, res) {
  const Razorpay = require('razorpay')
  var instance = new Razorpay({
    key_id: process.env.RAZOR_KEY,
    key_secret: process.env.RAZOR_SECRET
  })

  var options = {
    amount: Number(req.body.amount*100), // amount in the smallest currency unit
    currency: 'INR'
  }
  const order = await instance.orders.create(options)
  console.log(order)
  res.status(200).json(order)
}
