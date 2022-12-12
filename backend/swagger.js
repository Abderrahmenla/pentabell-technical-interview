import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Pentabell API',
    description: 'Pentabell API documentation by <b>swagger-autogen</b>.',
  },
  host: 'localhost:5000',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Users',
      description: 'Endpoints',
    },
    {
      name: 'Orders',
      description: 'EndPoints',
    },
    {
      name: 'Products',
      description: 'EndPoints',
    },
    {
      name: 'Uploads',
      description: 'EndPoints',
    },
  ],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  definitions: {
    User: {
      _id: '',
      $firstName: 'abderrahmen',
      $lastName: 'lahmedi',
      $phoneNumber: '20 933 337',
      $email: 'contact@abderrahmenlh.comm',
      $password: '123456',
      token: 'oiuytiotyu',
    },
    Todos: {
      $user: '',
      $title: 'Task5',
      $description: 'A simple task',
      $finished: '',
      $created_at: '01-02-2023 13:00:00',
      $updated_at: '01-03-2023 12:00:00',
      $finished_at: '01-03-2023 12:00:00',
    },
  },
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  await import('./server.js'); // Your project's root file
});
