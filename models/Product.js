import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    desc: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    availableQty: {
      type: Number,
      required: true
    },
    variants: [
      {
        color: {
          type: String,
          required: true
        },
        sizes: {
          type: Map, // Using Map to store size-quantity pairs
          of: Number, // Values should be of type Number
          required: true
        },
        images: [{ type: String }]
      }
    ],
    discount: {
      type: Number,
      require: true,
      default: 0
    }
  },

  { timestamps: true }
)

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema)
