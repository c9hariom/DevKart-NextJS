import Product from '@/models/Product'
import connectDb from '@/middleware/mongoose'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      // Connect to the database
      await connectDb()

      const products = await Product.find({ slug: req.query.slug })

      // Send products as JSON response along with pagination metadata
      res.status(200).json({
        products
      })
    } catch (error) {
      console.error('Error fetching products:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.status(500).json({ status: 'This method is not supported' })
  }
}

export default handler
