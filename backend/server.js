import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cors from 'cors';
import todosRoutes from './routes/todosRoutes.js';
import userRoutes from './routes/userRoutes.js';
import forgotPasswordRoutes from './routes/forgotPasswordRoutes.js';
import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';

const swaggerFile = JSON.parse(
  await readFile(new URL('./swagger_output.json', import.meta.url))
);

dotenv.config();

connectDB();

const app = express();
const __dirname = path.resolve();
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors({
  origin: 'http://localhost:3000'
}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/todos', todosRoutes);
app.use('/api/password-reset', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
