import mongoose from 'mongoose'

const Schema = mongoose.Schema

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 20
    },
    content: String,
    status: {
      type: String,
      enum: ['TODO', 'IN_PROGRESS', 'DONE'],
      default: 'TODO'
    },
    tags: [{ type: String, maxLength: 10 }],
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'users'
    }
  },
  { timestamps: true }
)

export default mongoose.model('todos', todoSchema)
