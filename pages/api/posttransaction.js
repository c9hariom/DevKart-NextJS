// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from '@/models/Order'
import Product from '@/models/Product'
import connectDb from '@/middleware/mongoose'

const crypto = require('crypto')

export default async function handler (req, res) {
  try {
    console.log(req.body)
    connectDb()

    // validate the razorpay token

    let razorpay_order_id = req.body.razorpay_order_id,
      razorpay_payment_id = req.body.razorpay_payment_id,
      razorpay_signature = req.body.razorpay_signature

    let paymentInfo = {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      status: ''
    }

    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZOR_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex')

    if (generated_signature == razorpay_signature) {
      paymentInfo.status = 'signature verified'
    } else {
      console.log(generated_signature)
      paymentInfo.status = 'signature tampered'
      throw new Error('signature tampered')
    }

    //update orders table after checking the transaction status

    let order = await Order.findOneAndUpdate(
      { orderId: razorpay_order_id }, 
      {
        paymentInfo,
        status: 'paid'
      },
      { new: true }
    )

    // update the product quanity

    const products = order.products

    products.forEach(async product => {
      const { productId, qty, variant, size } = product
      const updatedProduct = await Product.findOneAndUpdate(
        {
          slug: productId,
          'variants.color': variant,
          [`variants.sizes.${size}`]: { $exists: true }
        },
        {
          $inc: {
            [`variants.$[outer].sizes.${size}`]: -qty, 
            availableQty: -qty 
          }
        },
        { new: true, arrayFilters: [{ 'outer.color': variant }] }
      )

      if (!updatedProduct) {
        console.error(
          `Product with _id '${productId}' and variant '${variant}' not found`
        )
        return
      }

      console.log(
        `Quantity of product with _id '${productId}' and variant '${variant}' updated successfully`
      )
    })

    res.redirect("/order?orderId="+razorpay_order_id)

    res.status(200).json({ body: req.body })
  } catch (error) {
    res.status(500).json(error)
  }
}
