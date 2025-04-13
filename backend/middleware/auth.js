const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  // Check if the token is present in the Authorization header
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

  // If no token, return an error
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to the request object for further use in route handlers
    req.user = decoded.user;
    next();
  } catch (err) {
    // If token is invalid or expired, return an error
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = { protect };
