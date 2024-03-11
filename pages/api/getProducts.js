import Product from '@/models/Product'
import connectDb from '@/middleware/mongoose'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      // Connect to the database
      await connectDb()

      // Parse query parameters
      let { page, count } = req.query
      page = parseInt(page) || 1 // Default to page 1 if not provided
      count = parseInt(count) || 8 // Default to 8 if not provided

      // Calculate skip value based on page number and count
      const skip = (page - 1) * count

      // Fetch products from the database based on pagination
      const products = await Product.find({ availableQty: { $gt: 0 } })
        .skip(skip)
        .limit(count)

      // Get total count of products
      const totalCount = await Product.countDocuments({
        availableQty: { $gt: 0 }
      })

      // Calculate total pages
      const totalPages = Math.ceil(totalCount / count)

      // Send products as JSON response along with pagination metadata
      res
        .status(200)
        .json({
          totalResults: totalCount,
          results: products.length,
          totalPages,
          currentPage: page,
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
