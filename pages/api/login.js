import connectDb from '@/middleware/mongoose'
import User from '@/models/User'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      connectDb()

      const { email, password } = req.body

      const user = await User.findOne({ email }, { category: 0 })

      const result = await bcrypt.compare(password, user.password)

      if (!result) {
        return res.status(404).json({ status: 'Wrong credentials' })
      }

      if (result) {
        let authToken = jwt.sign(
          { _id: user._id, name: user.name, email: user.email },
          'hj@*(&#hjadjhg@*&^#jhs',
          {
            expiresIn: '2d'
          }
        )
        res.status(200).json({ authToken, name: user.name, email: user.email })
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
