import User from '@/models/User'
import connectDb from '@/middleware/mongoose'

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      connectDb()

      const { name, email, password } = req.body

      const user = new User({ name, email, password, category: 'user' })

      await user.save()

      res.status(200).json({ status: 'success', user })
    } else {
      res.status(401).json({ status: 'This method is unacceptable' })
    }
  } catch (error) {
    res.status(500).json(error )
  }
}

export default handler
