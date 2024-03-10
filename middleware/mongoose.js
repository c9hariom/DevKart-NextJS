import mongoose from 'mongoose'

const connectDb = async handler => {
  try {
    // Check if MongoDB is already connected
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB is already connected.')
      return handler
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('MongoDB connected successfully.')

    // Return the handler function after successful connection
    return handler
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw new Error('Failed to connect to MongoDB.')
  }
}

export default connectDb
