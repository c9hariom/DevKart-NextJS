import Order from '@/models/Order'
import connectDb from '@/middleware/mongoose'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      // Connect to the database
      await connectDb()

      const order = await Order.findOne({ orderId: req.query.orderId })

      // Send products as JSON response along with pagination metadata
      res.status(200).json(order)
    } catch (error) {
      console.error('Error fetching Order:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.status(500).json({ status: 'This method is not supported' })
  }
}

export default handler
