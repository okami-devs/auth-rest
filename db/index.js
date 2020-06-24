const monk = require('monk');
const connection = '127.0.0.1:27017/auth-rest';
const db = monk(connection);

module.exports = db;
