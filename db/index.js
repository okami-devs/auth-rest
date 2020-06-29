const monk = require('monk');
const connection = process.env.MONGODB_URI;
const db = monk(connection);

module.exports = db;
