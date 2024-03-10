import Product from '@/models/Product'
import connectDb from '@/middleware/mongoose'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Connect to the database
      await connectDb()
      let addStatus = {}
      for (let i = 0; i < req.body.length; i++) {
        let p = new Product({
          title: req.body[i].title,
          slug: req.body[i].slug,
          desc: req.body[i].desc,
          img: req.body[i].img,
          category: req.body[i].category,
          size: req.body[i].size,
          color: req.body[i].color,
          price: req.body[i].price,
          availableQty: req.body[i].availableQty
        })

        let checker = await Product.exists({ slug: req.body[i].slug })
        if (checker) {
          addStatus[req.body[i].slug] = 'already exists skipped...'
          continue
        }
        await p.save()
        addStatus[req.body[i].slug] = 'Added...'
      }

      // Fetch products from the database
      const products = await Product.find()

      // Send products as JSON response
      res
        .status(200)
        .json({ status: addStatus, totalResults: products.length, products })
    } catch (error) {
      console.error('Error fetching products:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.status(500).json({ error: 'Only accept POST method' })
  }
}

export default handler
