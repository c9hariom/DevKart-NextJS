import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    paymentInfo: {
      type: {
        razorpay_order_id: { type: String, default: '' },
        razorpay_payment_id: { type: String, default: '' },
        razorpay_signature: { type: String, default: '' },
        status: { type: String, default: '' }
      },
      required: true
    },
    products: [
      {
        type: {
          productId: String,
          qty: Number,
          price: Number,
          name: String,
          variant: String,
          size: String,
          img: String
        }
      }
    ],

    address: {
      type: {
        phone: String,
        street: String,
        landmark: String,
        roomno: String,
        state: String,
        city: String,
        zip: String
      },
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
