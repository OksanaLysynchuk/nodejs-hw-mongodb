require('dotenv').config();
const { setupServer } = require('./server');
const { initMongoConnection } = require('./db/initMongoConnection');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await initMongoConnection();
    const app = setupServer();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
