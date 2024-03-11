import Product from '@/models/Product'
import connectDb from '@/middleware/mongoose'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Connect to the database
      await connectDb()

      let addStatus = {}

      for (let i = 0; i < req.body.length; i++) {
        const { slug, title, desc, img, category, price, discount, variants } =
          req.body[i]

        let availableQty = 0
        for (let j = 0; j < variants.length; j++) {
          let keys = Object.keys(variants[j].sizes)
          for (let k = 0; k < keys.length; k++) {
            availableQty += variants[j].sizes[keys[k]]
          }
        }

        console.log(availableQty)

        // Check if product with the same slug already exists
        const existingProduct = await Product.findOne({ slug })

        if (existingProduct) {
          addStatus[slug] = 'Already exists, skipped...'
          continue
        }

        // Create new product instance
        const product = new Product({
          title,
          slug,
          desc,
          img,
          category,
          price,
          discount,
          variants,
          availableQty
        })

        // Save the product to the database
        await product.save()
        addStatus[slug] = 'Added successfully'
      }

      // Fetch all products from the database
      const products = await Product.find()

      // Send response with status and product details
      res.status(200).json({
        status: addStatus,
        totalResults: products.length,
        products
      })
    } catch (error) {
      console.error('Error fetching products:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.status(500).json({ error: 'Only accept POST method' })
  }
}

export default handler
