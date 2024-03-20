import connectDb from '@/middleware/mongoose'
const jwt = require('jsonwebtoken')

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Connect to the database
      await connectDb()

      const token = req.body.authToken
      console.log(req.body.authToken);

      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          console.error('JWT verification failed:', err);
          return;
        }
      
        const currentTimestamp = Math.floor(Date.now() / 1000);
      
        if (decoded.iat && decoded.iat > currentTimestamp) {
          console.error('Token issued in the future');
          return;
        }
      
        if (decoded.exp && decoded.exp < currentTimestamp) {
          console.error('Token has expired');
          return;
        }
      
        const status = "success"
        
      res.status(200).json({status})
        
      });


      
    } catch (error) {
      console.error('Error fetching Order:', error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.status(500).json({ status: 'This method is not supported' })
  }
}

export default handler
