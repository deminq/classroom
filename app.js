const express = require('express');
const mongoose = require('mongoose');

const { User } = require('./model');
const { passwordHasher } = require('./utils');
const { userRouter } = require('./routes');

const app = express();

mongooseConnector();

app.use(express.json());


app.post('/auth', async (req, res) => {
  try {
    const { password, email } = req.body;

    const userByEmail = await User.findOne({ email }).select('+password');

    if (!userByEmail) {
      throw new Error('Wrong email or password');
    }
    console.log(userByEmail);
    await passwordHasher.compare(userByEmail.password, password);

    res.json(userByEmail);
  } catch (e) {
    console.log(e);
    res.json(e.message);
  }
});

app.use('/users', userRouter);
app.use('*', _notFoundHandler);
app.use(handleErrors);

app.listen(5000, () => {
  console.log('App listen 5000');
});

function handleErrors(err, req, res, next) {
  res
    .status(err.status)
    .json({
      message: err.message || 'Unknown error',
      customCode: err.code || 0
    });
}

function _notFoundHandler(err, req, res, next) {
  next({
    status: err.status || 404,
    message: err.message || 'Rout not fond'
  });
}

function mongooseConnector() {
  mongoose.connect('mongodb://localhost:27017/classroom');
}