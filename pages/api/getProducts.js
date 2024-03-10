import Product from '@/models/Product'
import connectDb from '@/middleware/mongoose'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      // Connect to the database
      await connectDb()

      // Fetch products from the database
      const products = await Product.find()

      // Send products as JSON response
      res.status(200).json({ products })
    } catch (error) {
      console.error('Error fetching products:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.status(500).json({ status: 'this method is not supported' })
  }
}

export default handler
