const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

//Import controllers
const securityController = require('./controllers/securityController');
const usersController = require('./controllers/userController');

//Import custom middlewares
const verifyToken = require('./middlewares/verifyToken');

//Keep reference of root path
global.__appRoot = path.resolve(__dirname);

//Initialize express
const app = express();

//Base middlewares for express
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Default headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
  
    next();
});

//Controllers
app.use('/api', securityController);
app.use('/api/users', verifyToken);
app.use('/api/users', usersController);

//Error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500)
    res.send({
      message: err.message      
    })
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});