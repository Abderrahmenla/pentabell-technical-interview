import mongoose from 'mongoose'

const todosSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    finished: {
      type: Boolean,
      required: true,
      default: false,
    },
    created_at: {
      type: Date,
    },
    updated_at: {
      type: Date,
      default: null,
    },
    finished_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

const Todos = mongoose.model('Todos', todosSchema)

export default Todos
