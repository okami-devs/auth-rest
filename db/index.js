const monk = require('monk');
require('dotenv').config();
const connection = process.env.MONGODB_URI;
const db = monk(connection);

module.exports = db;
