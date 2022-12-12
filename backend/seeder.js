import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import todos from './data/todos.js'
import User from './models/userModel.js'
import Todos from './models/todosModel.js'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Todos.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const user = createdUsers[0]._id
    const sampleTodos = todos.map((todo) => {
      return { ...todo, user }
    })

    await Todos.insertMany(sampleTodos)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Todos.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
