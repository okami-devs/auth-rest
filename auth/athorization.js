const jwt = require('jsonwebtoken');

function generateAccessToken(token) {
  // expires after half and hour (1800 seconds = 30 minutes)
  console.log(process.env.TOKEN_SECRET);
  const authToken = jwt.sign({token}, process.env.TOKEN_SECRET, { expiresIn: '1h' });
  return authToken;
}

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const token = req.headers.authorization;
  console.log(req.headers, token);
  
  if (token == null) return res.sendStatus(401); // if there isn't any token
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

module.exports = {
    generateAccessToken,
    authenticateToken
};
