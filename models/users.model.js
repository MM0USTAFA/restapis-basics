import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 8
    },
    password: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15
    },
    lastname: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15
    },
    dob: Date,
    token: String,
    todos: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'todos'
      }
    ]
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// userSchema.methods.

export default mongoose.model('users', userSchema)
