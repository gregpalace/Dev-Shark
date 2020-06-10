const express = require('express');
const path = require('path');
const app = express();
const resourceRouter = require('./routes/resourceRouter');
const PORT = 3000;
const cors = require('cors');
const mongoose = require('mongoose');

// Parse request body
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URI = 'mongodb+srv://cs_gregpalasciano:1234@delp-fp1gu.mongodb.net/Delp?retryWrites=true&w=majority';

// Connect to our database:
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  // for sharding our DB
  useUnifiedTopology: true,
  dbName: 'Delp'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

// Set up routers:
// Anythin going to /resource means we use resource router
app.use('/resource', resourceRouter);

// Send main app
app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, './client/index.html'));
});

// Catch-all route handler
app.use('*', (req, res) => {
  return res.sendStatus(404);
});

// Global error handler
app.use((err, req, res, next) => {
  console.log('invoking global error handler');
  const defaultErr = {
    log: 'Express error handler caught unknown middleware',
    status: 400,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
