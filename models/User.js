import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"]
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    category: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
) // Moved timestamps option inside the schema options object

export default mongoose.models.User || mongoose.model('User', UserSchema)
