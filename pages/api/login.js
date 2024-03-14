import connectDb from '@/middleware/mongoose'
import User from '@/models/User'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      connectDb()

      const { email, password } = req.body

      const user = await User.findOne(
        { email, password },
        { password: 0, category: 0 }
      )

      if (!user) {
        return res.status(404).json({ status: 'Wrong credentials' })
      }

      if (email === user.email) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ status: 'Wrong credentials' })
      }
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(401).json({ status: 'this method is not supported' })
  }
}

export default handler
