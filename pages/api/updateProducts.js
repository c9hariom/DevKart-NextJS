import Product from '@/models/Product'
import connectDb from '@/middleware/mongoose'

const handler = async (req, res) => {
  if (req.method === 'PUT') {
    try {
      await connectDb()
      for (let i = 0; i < req.body.length; i++) {
        if (req.body[i].variants) {
          let newQty = 0
          for (let j = 0; j < req.body[i].variants.length; j++) {
            let newKeys = Object.keys(req.body[i].variants[j].sizes)
            newKeys.map(item => {
              newQty += req.body[i].variants[j].sizes[item]
            })
          }
          req.body[i].availableQty = newQty
        }

        await Product.findByIdAndUpdate(req.body[i]._id, req.body[i])
      }

      // Fetch products from the database
      const products = await Product.findById(req.body[0]._id)

      // Send products as JSON response
      res.status(200).json({ status: 'success', products })
    } catch (error) {
      res.status(500).json({ status: 'Internal server error' })
    }
  } else {
    res.status(400).json({ status: 'this method is not supported' })
  }
}

export default handler
