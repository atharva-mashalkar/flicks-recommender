const jwt = require('jsonwebtoken');

const TOKEN_EXPIRY="1 days"; 
const secret = process.env.JWT_SECRET || 'v%WQ^&EV%E%^QW%D*QWDB*^D*%^%^5675^%^&QW%DQBd76%^&D%Q^&%D&';

module.exports = {
  issue: (payload) => jwt.sign(payload, secret, { expiresIn: TOKEN_EXPIRY }),
  verify: (token, cb) => jwt.verify(token, secret, {}, cb),
  refresh: (token) => {
    const decoded = jwt.decode(token);
    delete decoded['iat']
    delete decoded['exp']
    return jwt.sign(decoded, 
            secret, 
            { expiresIn: TOKEN_EXPIRY })
  },
  decode: (token) => jwt.decode(token),
};
