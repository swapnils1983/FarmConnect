const jwt = require('jsonwebtoken');


const authUser = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decodedData.id };
      next();
    } catch (error) {
        console.log(error)
      res.status(401).json({ message: "Authentication failed" });
    }
  }

module.exports = authUser;