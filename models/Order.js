import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 } // Changed 'number' to 'Number'
      }
    ],
    address: {
      type: String,
      required: true
    },
    amount: {
      type: Number, // Changed 'number' to 'Number'
      required: true
    },
    status: {
      type: String,
      default: 'pending',
      required: true // Removed quotes around true
    }
  },
  { timestamps: true }
) // Moved timestamps option inside the schema options object

export default mongoose.models.Order || mongoose.model('Order', OrderSchema) // Added check for existing model
