import express from 'express'
const router = express.Router()
import {
  getToDos,
  deleteToDo,
  createToDo,
  updateToDo,
} from '../controllers/todosController.js'
import protect  from '../middleware/authMiddleware.js'

router
  .route('/:id')
  .post(protect, createToDo)
  .get(protect,getToDos)
  .delete(protect, deleteToDo)
  .put(protect, updateToDo)

export default router
