export default {
  url: process.env.MONGO_URL || 'mongodb://localhost/',
  databaseName: process.env.MONGO_DB_NAME || 'siteCapture',
};
