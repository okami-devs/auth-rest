const express = require('express');
const volleyball = require('volleyball');
const cors = require('cors');
const dotenv = require('dotenv');
const auth = require('./auth');
const jwt = require('./auth/athorization');

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
};

// get config vars
dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(volleyball);

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.json({
    message: '🦄 Hello World!',
  });
});

app.use('/auth', auth);

app.get('/test', jwt.authenticateToken, (req, res) => {
  // executes after authenticateToken
  // ...
  res.status(201);
  res.json({
    message: 'Succesfully created ✅!',
    data: {
      user: req.user,
    },
  });
});

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found - ', req.originalUrl());
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port', `http://localhost:${port}`);
});
