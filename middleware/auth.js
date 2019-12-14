const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  //check for token
  if (!token) {
    res.status(401).json({msg: 'no token: authorization denied.'})
  }

  try {
    //verify token:
    const decoded = jwt.verify(token, keys.jwtSecret)
    //add user from payload:
    req.player = decoded;
    next()
  } catch (e) {
    res.status(400).json({msg: "token is not valid"})
  }
}

module.exports = auth;