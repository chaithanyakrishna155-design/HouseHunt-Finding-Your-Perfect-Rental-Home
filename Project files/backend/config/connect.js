const mongoose = require('mongoose');

const connectionOfDb = () => {
  const mongoUri = process.env.MONGO_DB;

  if (!mongoUri || typeof mongoUri !== 'string') {
    console.error('Missing MongoDB URI: define MONGO_DB in .env');
    process.exit(1);
  }

  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error(`Could not connect to MongoDB: ${err.message || err}`);
      process.exit(1);
    });
};

module.exports = connectionOfDb;