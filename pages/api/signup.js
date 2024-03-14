import User from '@/models/User'
import connectDb from '@/middleware/mongoose'

const bcrypt = require('bcryptjs')

const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      connectDb()

      const { name, email, password } = req.body

      var salt = await bcrypt.genSalt(10)
      var hash = await bcrypt.hash(password, salt)

      const user = new User({ name, email, password: hash, category: 'user' })

      await user.save()

      res.status(200).json({ status: 'success', user })
    } else {
      res.status(401).json({ status: 'This method is unacceptable' })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export default handler
