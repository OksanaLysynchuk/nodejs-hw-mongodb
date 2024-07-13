require('dotenv').config();

const express = require('express');
const initMongoConnection = require('./db/initMongoConnection');

const app = express();
const { PORT, MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
  process.env;

initMongoConnection();

app.use(express.json());
app.use('/contacts', require('./routes/contacts'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
