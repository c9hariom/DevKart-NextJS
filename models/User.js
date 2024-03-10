import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
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
    }
  },
  { timestamps: true }
) // Moved timestamps option inside the schema options object

export default mongoose.models.User || mongoose.model('User', UserSchema)
