const jwt = require('jsonwebtoken');

const authenticateBuyer = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace `process.env.JWT_SECRET` with your secret key
    req.user = decoded;
    next();
  } catch (error) {
    // console.log(error)
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authenticateBuyer;