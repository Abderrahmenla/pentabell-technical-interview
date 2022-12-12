import asyncHandler from 'express-async-handler';
import Todos from '../models/todosModel.js';

// @desc    Fetch all todos
// @route   GET /api/todos/:id
// @access  Private
const getToDos = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Todos']
  // #swagger.description = 'Get all todos of a user.'
  // #swagger.parameters['id'] = { description: 'ID of the user.' }

  const todos = await Todos.find({user: req.params.id});

  res.json({ todos });
});

// @desc    Delete a ToDo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteToDo = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Todos']
  // #swagger.description = ' Delete a todo by its own user only.'
  // #swagger.parameters['id'] = { description: 'ID of the user.' }
   // #swagger.parameters['todoID'] = { description: 'The todo ID.' }
  /* #swagger.security = [{
               "Bearer": []
        }] */   
  const todo = await Todos.findById(req.query.todoID);
  if (todo?.user.toString() === req.params.id.toString()) {
    await todo.remove();
    res.json({ message: 'ToDo removed' });
  } else {
    res.status(404);
    throw new Error('ToDo not found');
  }
});

// @desc    Create a ToDo
// @route   POST /api/todos/:id
// @access  Private
const createToDo = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Todos']
  // #swagger.description = 'Create a ToDo for the user.'
  /* #swagger.security = [{
               "Bearer": []
        }] */

  const {
    user=req.params.id,
    title='',
    description='',
  } = req.body;
  /* #swagger.parameters['newTodo'] = {
            in: 'body',
            description: 'the ToDo details.',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/Todos" }
        } */

  const newTodo = {
    user,
    title,
    finished : false,
    created_at : Date.now(),
    updated_at : null ,
    finished_at : null ,
    description,
  };

  const todo = new Todos(newTodo);
  const createdToDo = await todo.save();
  /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/Todos" },
            description: 'Created ToDo.' 
        } */
  res.status(201).json(createdToDo);
});

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Private
const updateToDo = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Todos']
  // #swagger.description = 'Update a ToDo by its own the user.'
  // #swagger.parameters['id'] = { description: 'ID of the user.' }
  /* #swagger.security = [{
               "Bearer": []
        }] */

  const { title,
          finished,
          description, } = req.body;

  const todo = await Todos.findById(req.query.todoID);

  if (todo?.user.toString() === req.params.id.toString()) {
    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.updated_at = Date.now();
    if (finished) {
      todo.finished_at = Date.now();
      todo.finished = true
    }

    const updatedToDo = await todo.save();
    /* #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/Todos" },
            description: 'Updated ToDo.' 
        } */
    res.json(updatedToDo);
  } else {
    res.status(404);
    throw new Error('Todo not found');
  }
});


export {
  getToDos,
  deleteToDo,
  createToDo,
  updateToDo,
};
