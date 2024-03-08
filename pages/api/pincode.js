const pinDataBase = new Set([121212, 230302, 230001, 111111, 121223])

export default function handler (req, res) {
  try {
    const pincode = req.query.pin

    if (pincode.length !== 6) {
      res.status(404).json({ status: false, msg: 'bad pincode format' })
    }

    if (pinDataBase.has(parseInt(pincode))) {
      res
        .status(200)
        .json({ status: true, msg: 'Yay, the pincode is servicable 😊' })
    } else {
      res
        .status(200)
        .json({ status: false, msg: 'Oops, the pincode is not servicable 😒' })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
