const express = require('express');
const GraphHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const depthLimit = require('graphql-depth-limit');

const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// Import controllers
const securityController = require('./controllers/securityController');
const usersController = require('./controllers/userController');

// Import graphql schema
const Schema = require('./graphql/schema.js');

// Import custom middlewares
const verifyToken = require('./middlewares/verifyToken');

// Keep reference of root path
global.__appRoot = path.resolve(__dirname);

// Initialize express
const app = express();

// Swagger config
const swaggerDefinition = {
  info: {
    title: 'API Title',
    version: '1.0.0',
    description: 'API Description',
    host: '127.0.0.1:5000',
    basePath: '/',
  },
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.get('/api/swagger.json', (_req, res) => {
  res.header('Content-Type', 'application/json');
  return res.send(swaggerSpec);
});

// Base middlewares for express
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Default headers
// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }

    next();
});

// Controllers
app.use('/api', securityController);
app.use('/api/users', verifyToken);
app.use('/api/users', usersController);

// Error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    res.send({
      error: err.message,
    });
});

app.use(
  '/graphql',
  verifyToken,
  GraphHTTP((req) => ({
    schema: Schema,
    pretty: true,
    graphiql: true,
    context: {
      user: req.user,
      // SECRET
    },
    validationRules: [depthLimit(10)],
  })),
);

app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.clear();

  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
